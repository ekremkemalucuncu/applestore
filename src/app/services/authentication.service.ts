import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{

    
    constructor(
        private auth:AngularFireAuth,
        private router:Router
    ){}

    registerUser(form:FormGroup){
       return this.auth.createUserWithEmailAndPassword(
            form.value.email,
            form.value.password
          )
          .then(function() {
            this.router.navigate([''])
          }).catch(function(error) {
            //
        })
    }

    signUser(form:FormGroup){
        this.auth.signInWithEmailAndPassword(
            form.value.email,
            form.value.password
        )
        .then(function(result) {
            this.router.navigate['']
          }).catch(function(error) {
            console.log(error)
          })
    }

   

    logout(){
      this.auth.signOut().then(
        () => {
          this.router.navigate(['/authentication'])
        }
      )
    }
}
