import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accessoir } from 'src/app/shared/models/accessoirs.model';
import { Iphone } from 'src/app/shared/models/iphone.model';
import { ProductService } from 'src/app/core/services/products.service';
import { FormCreation } from '../../../core/services/formcreation.service';
import { iPhones, Accessoirs, Offers } from 'src/app/shared/firestore.collections';
import * as productActions from '../../../shared/store/products/products.actions'
import * as fromRoot from '../../../app.reducer'
import { Store } from '@ngrx/store';
import { deleteOfferStarted } from '../../../shared/store/products/products.actions';
@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {

  form: FormGroup;
  product: string;
  id: string;
  productUpdate: Iphone | Accessoir
  formProduct: any;
  fetchedIphones: any;
  fetchedAccessoirs: any;
  selectedaccessoir: Accessoir;
  selectediphone: Iphone;

  constructor(
    private productservice: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formcreation: FormCreation,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.params['product']
    this.id = this.route.snapshot.params['id']

    if (this.product == iPhones) {
      this.form = this.formcreation.formCreationIphone(this.product, this.id, this.form)
    }
    else if (this.product == Accessoirs) {
      this.form = this.formcreation.formCreationAccessoir(this.product, this.id, this.form)
    }
    else if (this.product == Offers) {
      this.form = this.formcreation.formCreationOffer(this.product, this.id, this.form)['form']
      this.fetchedIphones = this.formcreation.formCreationOffer(this.product, this.id, this.form)['fetchedIphones']
      this.fetchedAccessoirs = this.formcreation.formCreationOffer(this.product, this.id, this.form)['fetchedAccessoirs']
      this.selectedaccessoir = this.formcreation.formCreationOffer(this.product, this.id, this.form)['selectedaccessoir']
      this.selectediphone = this.formcreation.formCreationOffer(this.product, this.id, this.form)['selectediphone']
    }
  }


  onSubmit() {
    if (this.product == iPhones) {
      this.productservice.createProducts(this.product, this.form);
      this.router.navigate(['/productmanager'], { queryParams: { product: 'iphone' } })
    }
    else if (this.product == Accessoirs) {
      this.productservice.createProducts(this.product, this.form);
      this.router.navigate(['/productmanager', { product: 'accessoir' }])
    }
    else if (this.product == Offers) {
      this.productservice.createProducts(this.product, this.form);
      this.router.navigate(['/productmanager', { product: 'offer' }])
    }
  }


  onUpdate() {
    if (this.product == iPhones) {
      this.store.dispatch(productActions.updateIphonesStarted({ id: this.id, form: this.form }))
    }
    else if (this.product == Accessoirs) {
      this.store.dispatch(productActions.updateAccessoirStarted({ id: this.id, form: this.form }))
    }
    else if (this.product == Offers) {
      this.productservice.updateProducts(this.product, this.form, this.id);
      this.router.navigate(['/productmanager', { product: 'offer' }])
    }
  }


  onDelete() {
    if (this.product == iPhones) {
      this.store.dispatch(productActions.deleteIphoneStarted({ id: this.id }));
    }
    else if (this.product == Accessoirs) {
      this.store.dispatch(productActions.deleteAccessoirStarted({ id: this.id }));
    }
    else if (this.product == Offers) {
      this.store.dispatch(productActions.deleteOfferStarted({ id: this.id }));
    }
  }
}
