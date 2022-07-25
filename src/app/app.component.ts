import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AUTH from './reducers/auth.actions'
import * as fromRoot from './app.reducer'
import { ProductService } from './services/products.service';


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
    private productservice:ProductService
  ){
  }
  
  ngOnInit(): void {
      this.fAuth.authState.subscribe(
        user => {
          if (user){
            this.store.dispatch(new AUTH.Authenticated());
          }
        }
      )
      
      this.productservice.fetchProducts('iPhones');
      this.productservice.fetchProducts('Accessoirs');
  }
}
