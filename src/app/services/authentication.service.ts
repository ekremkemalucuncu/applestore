import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import * as fromRoot from '../app.reducer'
import * as AUTH from '../reducers/auth.actions'
import * as LOADING from '../reducers/loading.actions'


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{


    constructor(
        private auth:AngularFireAuth,
        private router:Router,
        private store: Store<fromRoot.State>
    ){}


    registerUser(form:FormGroup){
      this.store.dispatch(new AUTH.Authenticated());
      this.store.dispatch(new LOADING.Loading())
      this.auth.createUserWithEmailAndPassword(
            form.value.email,
            form.value.password
          )
          .then(
            () => {
            this.store.dispatch(new LOADING.NotLoading());
          })
          .catch(function(error) {
            this.store.dispatch(new LOADING.NotLoading());
          })
          .finally(() =>{
            this.store.dispatch(new LOADING.NotLoading());
            this.router.navigate(['']);
          })

    }

    signUser(form:FormGroup){
      this.store.dispatch(new AUTH.Authenticated());
      this.store.dispatch(new LOADING.Loading());
      this.auth.signInWithEmailAndPassword(
            form.value.email,
            form.value.password
            )
            .then(
              () => {
              this.store.dispatch(new LOADING.NotLoading());
            })
            .catch(function(error) {
              this.store.dispatch(new LOADING.NotLoading());
            })
            .finally(() => {
              this.router.navigate(['']);
              this.store.dispatch(new LOADING.NotLoading());
            })
    }

   

    logout(){
      this.store.dispatch(new LOADING.Loading());
      this.auth.signOut()
      .then(
        () => {
          this.store.dispatch(new AUTH.NotAuthenticated());
          this.store.dispatch(new LOADING.NotLoading());
        }
      )
    }
}
