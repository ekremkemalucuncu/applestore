import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/services/authentication.service';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromAuth from '../shared/reducers/auth.reducer'


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  signInForm:FormGroup;
  signUpForm:FormGroup;
  isLoading: boolean;
  isAuth:boolean;
  Message:Promise<any>
  hidesignin = true;
  hidesignup=true;
  storeSubAuth:Subscription;
  storeSubLoading:Subscription;

  
  constructor(
    private authService:AuthenticationService,
    private store:Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])
    });

    this.signUpForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])
    })

    this.storeSubAuth= this.store.select('auth').subscribe(
      authState => { this.isAuth = authState.isAuth}
    )

    this.storeSubLoading = this.store.select('loading').subscribe(
      loadingState => {this.isLoading=loadingState.isLoaded}
    )


    if (this.isAuth){
      this.onLogout()
    }
  }

  onLogin(){
   this.authService.signUser(this.signInForm)
  }

  onRegister(){
    this.authService.registerUser(this.signUpForm) 
  }

  onLogout(){
    this.authService.logout()
  }
}
