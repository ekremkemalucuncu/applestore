import { Component, Input, OnInit } from '@angular/core';
import { Accessoirs } from '../models/accessoirs.model';
import { Iphone } from '../models/iphone.model';
import { ProductService } from '../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


 
  @Input() from:string;
  product:string;
  managing:boolean;
  fetchedProducts:Iphone[]|Accessoirs[];
  

  constructor(
    private productservice:ProductService
  ) { }

  ngOnInit(): void {

    if (this.from == 'iphonemanager'){
      this.product='iPhones';
      this.managing=true;
      this.productservice.getProduct('iphone').subscribe(
        productlist=>{
          this.fetchedProducts=productlist
        }
      )
    }
    else if (this.from == 'accessoirmanager'){
      this.product='Accessoirs';
      this.managing=true;
      this.productservice.getProduct('accessoir').subscribe(
        productlist=>{
          this.fetchedProducts=productlist
        }
      )
    }
    else if (this.from =="iphone"){
      this.product='iPhones';
      this.managing=false;
      this.productservice.getProduct('iphone').subscribe(
        productlist=>{
          this.fetchedProducts=productlist
        }
      )
    }
    else if (this.from == 'accessoir'){
      this.product='Accessoirs';
      this.managing=false;
      this.productservice.getProduct('accessoir').subscribe(
        productlist=>{
          this.fetchedProducts=productlist
        }
      )
    }
  }

}
