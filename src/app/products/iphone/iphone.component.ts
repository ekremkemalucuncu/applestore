import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-iphone',
  templateUrl: '../products.component.html',
  styleUrls: ['../products.component.css']
})
export class IphoneComponent implements OnInit {

  items:Observable<any>

  constructor(
    private productservice:ProductService
  ) { }

  ngOnInit(): void {
    this.productservice.fetchProducts().subscribe(
      result => {
        console.log(result)
      }
    )
  }

}
