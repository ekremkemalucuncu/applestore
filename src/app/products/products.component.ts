import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Accessoir } from '../models/accessoirs.model';
import { Iphone } from '../models/iphone.model';
import { ProductService } from '../services/products.service'
import { take } from 'rxjs/operators'
import { iPhones,Accessoirs,Offers } from '../shared/firestore.collections';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


 
  @Input() from:string;
  product:string;
  managing:boolean;
  fetchedProducts:Iphone[]|Accessoir[];
  

  constructor(
    private productservice:ProductService
  ) { }

  ngOnInit(): void {

    if (this.from.includes('iphone')){
      this.product=iPhones
    }
    else if(this.from.includes('accessoir')){
      this.product=Accessoirs
    }
    else if(this.from.includes('offer')){
      this.product=Offers
    }

    if (this.from.includes('manager')){
      this.managing=true
    }
    else{
      this.managing=false
    }
    

    this.productservice.getProduct(this.product)
    .pipe(take(1))
    .subscribe(
      productlist=>{
        this.fetchedProducts=productlist
      }
    )
  }
}
