import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  signin=true;
  signInForm:FormGroup;
  signUpForm:FormGroup;

  constructor(
    private authService:AuthenticationService
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
