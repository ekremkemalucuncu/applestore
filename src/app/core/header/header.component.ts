import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as fromAuth from '../../shared/reducers/auth.reducer'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // isAuth$:Observable<fromAuth.State>;
  isAuth:boolean;
  storeSub:Subscription;

  constructor(
    private store:Store<fromRoot.State>
  ){}

  
  ngOnInit():void{
    this.storeSub = this.store.select('auth').subscribe(
      authState => {
        this.isAuth=authState.isAuth
      } 
    );
  }
}
