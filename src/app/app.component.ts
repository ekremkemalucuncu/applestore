import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AUTH from './shared/store/auth/auth.actions'
import * as fromRoot from './app.reducer'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  items: Observable<any>;
  
  constructor(
    private fAuth : AngularFireAuth,
    private store : Store<fromRoot.State>,
  ){
  }
  
  ngOnInit(): void {
      this.fAuth.authState.subscribe(
        user => {
          if (user){
            this.store.dispatch(AUTH.Authenticated());
          }
        }
      )
    }
}
