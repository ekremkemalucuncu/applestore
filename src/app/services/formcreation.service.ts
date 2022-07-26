import { Injectable } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ProductService } from "src/app/services/products.service"
import { Iphone } from "../models/iphone.model"
import { take } from "rxjs/operators"
import { Accessoir } from "../models/accessoirs.model"
import { iPhones, Accessoirs } from "../shared/firestore.collections"


@Injectable({
    providedIn: 'root'
})
export class FormCreation{


    constructor(
        private productservice:ProductService
    ){
        
    }

    formCreationIphone(product:string,id:string,form:FormGroup){
        form = new FormGroup({
          name: new FormControl(null,[Validators.required]),
          model: new FormControl(null,[Validators.required]),
          price: new FormControl(null,[Validators.required]),
          imagesource: new FormControl(null,[Validators.required]),
          color: new FormControl(null,[Validators.required]),
          screensize: new FormControl(null,[Validators.required]),
          sku: new FormControl(null,[Validators.required]),
          description: new FormControl(null,[Validators.required]),
        })
    
        if(id){
          let formProduct=this.productservice.getProductByID(id,product)
          form.get('name').setValue(formProduct['name'])
          form.get('model').setValue(formProduct['model'])
          form.get('price').setValue(formProduct['price'])
          form.get('imagesource').setValue(formProduct['imagesource'])
          form.get('color').setValue(formProduct['color'])
          form.get('screensize').setValue(formProduct['name'])
          form.get('sku').setValue(formProduct['sku'])
          form.get('description').setValue(formProduct['description'])
          console.log(formProduct)
        }
        return form
      }
    
    
      formCreationAccessoir(product:string,id:string,form:FormGroup){
        form = new FormGroup({
          name: new FormControl(null,[Validators.required]),
          price: new FormControl(null,[Validators.required]),
          imagesource: new FormControl(null,[Validators.required]),
          description: new FormControl(null,[Validators.required]),
        })
    
        if(id){
          let formProduct=this.productservice.getProductByID(id,product);
          form.get('name').setValue(formProduct['name'])
          form.get('price').setValue(formProduct['price'])
          form.get('imagesource').setValue(formProduct['imagesource'])
          form.get('description').setValue(formProduct['description'])
        }
        return form
      }
    
    
      formCreationOffer(product:string,id:string,form:FormGroup){
        form = new FormGroup({
          name: new FormControl(null,[Validators.required]),
          iphone: new FormControl(null,[Validators.required]),
          accessoir: new FormControl(null,[Validators.required]),
          price: new FormControl(null,[Validators.required]),
        })
    
        if(id){
          let formProduct=this.productservice.getProductByID(id,product);
          form.get('name').setValue(formProduct['name'])
          form.get('price').setValue(formProduct['price'])
          form.get('iphone').setValue(formProduct['iphone']['name'])
          form.get('accessoir').setValue(formProduct['accessoir']['name'])
        }

        let fetchedIphones:Iphone[];
        this.productservice.getProduct(iPhones)
        .pipe(take(1))
        .subscribe(
          productlist=>{
            fetchedIphones=productlist
          }
        )
        
        let fetchedAccessoirs:Accessoir[];
        this.productservice.getProduct(Accessoirs)
        .pipe(take(1))
        .subscribe(
          productlist=>{
            fetchedAccessoirs=productlist
          }
        )

        return {
          form:form,
          fetchedIphones:fetchedIphones,
          fetchedAccessoirs:fetchedAccessoirs}
      }
}