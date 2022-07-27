import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/services/authentication.service';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as FROMAUTH from '../shared/store/auth/auth.reducer'
import * as AUTH from '../shared/store/auth/auth.actions';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  signInForm: FormGroup;
  signUpForm: FormGroup;
  isAuth: boolean;
  Message: Promise<any>
  hidesignin = true;
  hidesignup = true;
  authState: Observable<FROMAUTH.State>;

  constructor(
    private authService: AuthenticationService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    this.authState = this.store.select('auth').pipe(
      tap((authState) => { this.isAuth = authState.isAuth })
    )

    if (this.isAuth) {
      console.log("logout");
      this.onLogout()
    }
  }

  onLogin() {
    var email = this.signInForm.value.email;
    var password = this.signInForm.value.password;
    this.store.dispatch(AUTH.LoginStarted({ email: email, password: password }));
  }

  onRegister() {
    var email = this.signUpForm.value.email;
    var password = this.signUpForm.value.password;
    this.store.dispatch(AUTH.SignupStarted({ email: email, password: password }));
  }

  onLogout() {
    console.log("logout");
    this.store.dispatch(AUTH.LogOut());
    // this.authService.logout()
  }
}
