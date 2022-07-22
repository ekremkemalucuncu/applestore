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
  isAuth$: Observable<boolean>;
  Message:Promise<any>

  constructor(
    private authService:AuthenticationService,
    private route:ActivatedRoute,
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

    const status = this.route.snapshot.paramMap.get('status')
    if (status){
      this.onLogout();
    }

    this.isLoading$=this.store.select(fromRoot.getIsLoading)

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
