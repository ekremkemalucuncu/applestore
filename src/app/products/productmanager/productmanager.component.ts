import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-productmanager',
  templateUrl: './productmanager.component.html',
  styleUrls: ['./productmanager.component.css']
})
export class ProductmanagerComponent implements OnInit {

  from:string;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.from=this.route.snapshot.params['product']+'manager';
   
  }

}
