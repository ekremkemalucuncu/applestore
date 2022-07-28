import { Component, Input, OnInit } from '@angular/core';
import { Accessoir } from '../shared/models/accessoirs.model';
import { Iphone } from '../shared/models/iphone.model';
import { ProductService } from '../core/services/products.service'
import { iPhones, Accessoirs, Offers } from '../shared/firestore.collections';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as productActions from '../shared/store/products/products.actions'
import { Offer } from '../shared/models/offers.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() from: string;
  @Input() fetchedProducts: Iphone[] | Accessoir[] | Offer[];
  product: string;
  managing: boolean;
  loading: boolean


  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {

    if (this.from.includes('iphone')) {
      this.store.dispatch(productActions.getIPhonesStarted());
      this.store.select('product').subscribe((result) => {
        this.fetchedProducts = result.iphones
        this.loading = result.iphonesLoading
      })
      this.product = iPhones
    }
    else if (this.from.includes('accessoir')) {
      this.store.dispatch(productActions.getAccessoirsStarted());
      this.store.select('product').subscribe((result) => {
        this.fetchedProducts = result.accessoirs
        this.loading = result.accessoirsLoading
      })

      this.product = Accessoirs
    }
    else if (this.from.includes('offer')) {
      this.store.dispatch(productActions.getIPhonesStarted());
      this.store.dispatch(productActions.getAccessoirsStarted());
      this.store.dispatch(productActions.getOffersStarted());
      this.store.select('product').subscribe((result) => {
        this.fetchedProducts = result.offers
        this.loading = result.offersLoading
      })
      this.product = Offers
    }

    if (this.from.includes('manager')) {
      this.managing = true
    }
    else {
      this.managing = false
    }
  }

  remove(id: string, product: string) {
    if (product == 'Offers') {
      this.store.dispatch(productActions.deleteOfferStarted({ id: id }));
    }
  }
}
