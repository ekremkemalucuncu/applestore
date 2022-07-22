import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean>;

  constructor(
    private store:Store<fromRoot.State>
  ){}

  
  ngOnInit():void{
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }
}
