import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AUTH from 'src/app/shared/store/auth/auth.actions';
import * as fromRoot from '../../app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  storeSub: Subscription;

  constructor(
    private store: Store<fromRoot.State>
  ) { }


  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(
      authState => {
        this.isAuth = authState.isAuth
      }
    );
  }

  logout() {
    this.store.dispatch(AUTH.LogOut());
  }
}
