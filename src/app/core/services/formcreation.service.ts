import { Injectable } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ProductService } from "src/app/core/services/products.service"
import { Iphone } from "../../shared/models/iphone.model"
import { Accessoir } from "../../shared/models/accessoirs.model"
import { AngularFirestore } from "@angular/fire/compat/firestore"


@Injectable({
  providedIn: 'root'
})
export class FormCreation {


  constructor(
    private productservice: ProductService,
    private db: AngularFirestore
  ) {

  }

  formCreationIphone(product: string, id: string, form: FormGroup) {
    form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      imagesource: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      screensize: new FormControl(null, [Validators.required]),
      sku: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    })

    if (id) {
      let formProduct
      this.db.collection('iPhones').doc(id).valueChanges().subscribe(
        fetchedproduct => {
          formProduct = fetchedproduct
          form.get('name').setValue(formProduct['name'])
          form.get('model').setValue(formProduct['model'])
          form.get('price').setValue(formProduct['price'])
          form.get('imagesource').setValue(formProduct['imagesource'])
          form.get('color').setValue(formProduct['color'])
          form.get('screensize').setValue(formProduct['name'])
          form.get('sku').setValue(formProduct['sku'])
          form.get('description').setValue(formProduct['description'])
        }
      )
    }
    return form
  }


  formCreationAccessoir(product: string, id: string, form: FormGroup) {
    form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      imagesource: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    })

    if (id) {
      let formProduct;
      this.db.collection('Accessoirs').doc(id).valueChanges().subscribe(
        fetchedproduct => {
          formProduct = fetchedproduct
          form.get('name').setValue(formProduct['name'])
          form.get('price').setValue(formProduct['price'])
          form.get('imagesource').setValue(formProduct['imagesource'])
          form.get('description').setValue(formProduct['description'])
        }
      )

    }
    return form
  }


  formCreationOffer(product: string, id: string, form: FormGroup) {
    let selectedaccessoir: Accessoir;
    let selectediphone: Iphone;

    form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      iphone: new FormControl(null, [Validators.required]),
      accessoir: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    })

    if (id) {
      let formProduct = this.productservice.getProductByID(id, product);
      form.get('name').setValue(formProduct['name'])
      form.get('price').setValue(formProduct['price'])
      selectedaccessoir = formProduct['accessoir']
      selectediphone = formProduct['iphone']
    }

    return {
      form: form,
      selectedaccessoir: selectedaccessoir,
      selectediphone: selectediphone
    }
  }
}
