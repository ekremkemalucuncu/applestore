import { Component, Input, OnInit } from '@angular/core';
import { Accessoir } from '../shared/models/accessoirs.model';
import { Iphone } from '../shared/models/iphone.model';
import { ProductService } from '../core/services/products.service'
import {  Accessoirs, Offers } from '../shared/firestore.collections';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as phonesActions from '../shared/reducers/phones/phones.actions';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() from: string;
  product: string;
  managing: boolean;
  fetchedProducts: Iphone[] | Accessoir[];

  constructor(
    private productservice: ProductService,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit(): void {
    if (this.from.includes('iphone')) {
      this.store.dispatch(phonesActions.getPhonesStarted());
      this.store.select('phones').subscribe((result) => {
        this.fetchedProducts = result.phones;
      })
      // this.productservice.fetchProducts('iPhones');
      // this.product = iPhones
    }
    else if (this.from.includes('accessoir')) {
      this.productservice.fetchProducts('Accessoirs');
      this.product = Accessoirs
    }
    else if (this.from.includes('offer')) {
      this.productservice.fetchProducts('Offers');
      this.productservice.fetchProducts('Accessoirs');
      this.productservice.fetchProducts('iPhones');
      this.product = Offers
    }

    if (this.from.includes('manager')) {
      this.managing = true
    }
    else {
      this.managing = false
    }

    // this.productservice.getProduct(this.product)
    //   .pipe(take(1))
    //   .subscribe(
    //     productlist => {
    //       this.fetchedProducts = productlist
    //     }
    //   )
  }
}
