import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as AUTH from './auth.actions';
import { catchError, from, of, switchMap, tap } from 'rxjs';
import { Router } from "@angular/router";
import { SignupStarted } from './auth.actions';

@Injectable()
export class AuthenticationEffects {

  login = createEffect(() => {
    return this.actions.pipe(
      ofType(AUTH.LoginStarted),
      switchMap((action: any) => {
        return from(this.ngFireAuth.signInWithEmailAndPassword(action.email, action.password)).pipe(
          switchMap((result) => {
            console.log({ result: result });
            this.router.navigate(['']);
            return of(AUTH.Authenticated())
          }),
          catchError(async (error) => {
            console.log({ error: error });
            return AUTH.LoginFails({ error: error });
          }))
      }));
  })

  signup = createEffect(() => {
    return this.actions.pipe(
      ofType(AUTH.SignupStarted),
      switchMap((action: any) => {
        console.log({action: action});
        return from(this.ngFireAuth.createUserWithEmailAndPassword(action.email, action.password)).pipe(
          switchMap((result) => {
            console.log({ result: result });
            this.router.navigate(['']);
            return of(AUTH.Authenticated())
          }),
          catchError(async (error) => {
            console.log({ error: error });
            return AUTH.SignupFails({ error: error });
          }))
      }));
  })

  logOut$ = createEffect(() => this.actions.pipe(
    ofType(AUTH.LogOut),
    tap(() => {
        this.ngFireAuth.signOut();
        this.router.navigate(['authentication'])
    })
), { dispatch: false });

  constructor(private actions: Actions,
    private router: Router,
    private ngFireAuth: AngularFireAuth) { }
}
