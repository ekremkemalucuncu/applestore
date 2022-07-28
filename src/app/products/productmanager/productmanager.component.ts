import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Accessoir } from 'src/app/shared/models/accessoirs.model';
import { Iphone } from 'src/app/shared/models/iphone.model';
import { Offer } from 'src/app/shared/models/offers.model';
import * as fromRoot from '../../app.reducer'


@Component({
  selector: 'app-productmanager',
  templateUrl: './productmanager.component.html',
  styleUrls: ['./productmanager.component.css']
})
export class ProductmanagerComponent implements OnInit {

  from:string;
  fetchedProducts:Iphone[] | Accessoir[] | Offer[]

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private store:Store<fromRoot.State>
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.from=this.route.snapshot.params['product']+'manager';
    this.store.select('product').subscribe((result)=>{
      this.fetchedProducts = result.iphones
    })
  }

}
