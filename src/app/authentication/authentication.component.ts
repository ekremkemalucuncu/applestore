import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    this.authState = this.store.select('auth').pipe(
      tap((authState) => { this.isAuth = authState.isAuth })
    )
  }

  onLogin() {
    if (this.signInForm.valid) {
      var email = this.signInForm.value.email;
      var password = this.signInForm.value.password;
      this.store.dispatch(AUTH.LoginStarted({ email: email, password: password }));
    }
  }

  onRegister() {
    if (this.signUpForm.valid) {
      var email = this.signUpForm.value.email;
      var password = this.signUpForm.value.password;
      this.store.dispatch(AUTH.SignupStarted({ email: email, password: password }));
    }
  }

  onLogout() {
    this.store.dispatch(AUTH.LogOut());
  }
}
