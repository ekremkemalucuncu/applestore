import { Component, Input, OnInit } from '@angular/core';
import { Accessoir } from '../shared/models/accessoirs.model';
import { Iphone } from '../shared/models/iphone.model';
import { ProductService } from '../core/services/products.service'
<<<<<<< HEAD
import { iPhones,Accessoirs,Offers } from '../shared/firestore.collections';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as productActions from '../shared/store/products/products.actions'
import { Offer } from '../shared/models/offers.model';


=======
import { take } from 'rxjs/operators'
import { iPhones, Accessoirs, Offers } from '../shared/firestore.collections';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as phonesActions from '../shared/reducers/phones/phones.actions';
>>>>>>> 544149201b588bfffcf8d6ee14362ecc25c4a210
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

<<<<<<< HEAD

 
  @Input() from:string;
  product:string;
  managing:boolean;
  loading:boolean
  fetchedProducts:Iphone[] | Accessoir[] | Offer[]
  

  constructor(
    private productservice:ProductService,
    private store:Store<fromRoot.State>
  ) { }

  ngOnInit(): void {

    if (this.from.includes('iphone')){
      this.store.dispatch(productActions.getIPhonesStarted());
      this.store.select('product').subscribe((result)=>{
        this.fetchedProducts = result.iphones
        this.loading=result.iphonesLoading
      })
      this.product=iPhones
    }
    else if(this.from.includes('accessoir')){
      this.store.dispatch(productActions.getAccessoirsStarted());
      this.store.select('product').subscribe((result) =>{
        this.fetchedProducts = result.accessoirs
        this.loading=result.accessoirsLoading
      })

      this.product=Accessoirs
    }
    else if(this.from.includes('offer')){
      this.store.dispatch(productActions.getOffersStarted());
      this.store.select('product').subscribe((result) =>{
        this.fetchedProducts = result.offers
        this.loading=result.offersLoading
      })
      this.product=Offers
=======
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
>>>>>>> 544149201b588bfffcf8d6ee14362ecc25c4a210
    }

    if (this.from.includes('manager')) {
      this.managing = true
    }
    else {
      this.managing = false
    }
<<<<<<< HEAD
    
=======

    // this.productservice.getProduct(this.product)
    //   .pipe(take(1))
    //   .subscribe(
    //     productlist => {
    //       this.fetchedProducts = productlist
    //     }
    //   )
>>>>>>> 544149201b588bfffcf8d6ee14362ecc25c4a210
  }
}
