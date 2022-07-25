import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  signInForm:FormGroup;
  signUpForm:FormGroup;
  isLoading$: Observable<boolean>;
  isAuth$:Observable<boolean>;
  errorMessage$: Observable<boolean>;
  Message:Promise<any>
  hidesignin = true;
  hidesignup=true;

  
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

    this.isLoading$=this.store.select(fromRoot.getIsLoading);
    this.isAuth$=this.store.select(fromRoot.getIsAuthenticated);
    this.errorMessage$=this.store.select(fromRoot.getIsAuthenticated);

    if (this.isAuth$){
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
