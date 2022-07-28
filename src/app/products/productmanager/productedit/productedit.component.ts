import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accessoir } from 'src/app/shared/models/accessoirs.model';
import { Iphone } from 'src/app/shared/models/iphone.model';
import { ProductService } from 'src/app/core/services/products.service';
import { FormCreation } from '../../../core/services/formcreation.service';
import {
  iPhones,
  Accessoirs,
  Offers,
} from 'src/app/shared/firestore.collections';
import * as productActions from '../../../shared/store/products/products.actions';
import * as fromRoot from '../../../app.reducer';
import { Store } from '@ngrx/store';
import * as fromProducts from 'src/app/shared/store/products/products.reducer';
import { Observable } from 'rxjs';
import * as productsActions from '../../../shared/store/products/products.actions';
import { Offer } from 'src/app/shared/models/offers.model';
import { sliceNumber } from '../../../shared/number.slice';
@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css'],
})
export class ProducteditComponent implements OnInit {
  form: FormGroup;
  product: string;
  id: string;
  productUpdate: Iphone | Accessoir;
  formProduct: any;
  selectedaccessoir: Accessoir;
  selectediphone: Iphone;
  productsState: Observable<fromProducts.State>

  constructor(
    private productservice: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formcreation: FormCreation,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.params['product'];
    this.id = this.route.snapshot.params['id'];

    if (this.product == iPhones) {
      this.form = this.formcreation.formCreationIphone(
        this.product,
        this.id,
        this.form
      );
    } else if (this.product == Accessoirs) {
      this.form = this.formcreation.formCreationAccessoir(
        this.product,
        this.id,
        this.form
      );
    } else if (this.product == Offers) {
      this.store.dispatch(productsActions.getIPhonesStarted());
      this.store.dispatch(productsActions.getAccessoirsStarted());
      this.productsState = this.store.select('product');
      this.form = this.formcreation.formCreationOffer(
        this.product,
        this.id,
        this.form
      )['form'];
      this.selectedaccessoir = this.formcreation.formCreationOffer(
        this.product,
        this.id,
        this.form
      )['selectedaccessoir'];
      this.selectediphone = this.formcreation.formCreationOffer(
        this.product,
        this.id,
        this.form
      )['selectediphone'];
    }
  }

  onSubmit() {
    if (this.product == iPhones) {
      this.store.dispatch(productActions.createIphonesStarted({ data: this.form.value }))
    }
    else if (this.product == Accessoirs) {
      this.store.dispatch(productActions.createAccessoirStarted({ data: this.form.value }))
    }
    else if (this.product == Offers) {
      var offerInfo = {
        name: this.form.controls['name'].value,
        price: this.selectediphone.price + this.selectedaccessoir.price,
        oldprice: this.selectediphone.price + this.selectedaccessoir.price,
        rate: sliceNumber((this.selectediphone.price + this.selectedaccessoir.price) - (this.selectediphone.price + this.selectedaccessoir.price * 20 / 100), 5)
      }
      this.store.dispatch(productActions.createOfferStarted({ iphoneId: this.selectediphone.id, accessoirId: this.selectedaccessoir.id, data: offerInfo }))
    }
  }

  onUpdate() {
    if (this.product == iPhones) {
      this.store.dispatch(productActions.updateIphonesStarted({ id: this.id, payload: { ...this.form.value } })
      );
    } else if (this.product == Accessoirs) {
      this.store.dispatch(productActions.updateAccessoirStarted({ id: this.id, payload: { ...this.form.value } })
      );
    }
  }

  onDelete() {
    if (this.product == iPhones) {
      this.store.dispatch(productActions.deleteIphoneStarted({ id: this.id }));
    } else if (this.product == Accessoirs) {
      this.store.dispatch(
        productActions.deleteAccessoirStarted({ id: this.id })
      );
    } else if (this.product == Offers) {
      this.store.dispatch(productActions.deleteOfferStarted({ id: this.id }));
    }
  }
}
