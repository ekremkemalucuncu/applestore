import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accessoirs } from 'src/app/models/accessoirs.model';
import { Iphone } from 'src/app/models/iphone.model';
import { ProductService } from 'src/app/services/products.service';


@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {

  form:FormGroup;
  product:string;
  id:string;
  productUpdate:Iphone|Accessoirs

  constructor(
    private productservice:ProductService,
    private route:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.product=this.route.snapshot.params['product']
    this.id=this.route.snapshot.params['id']

  

    if(this.product=='iPhones'){
      this.form = new FormGroup({
        name: new FormControl(null,[Validators.required]),
        model: new FormControl(null,[Validators.required]),
        price: new FormControl(null,[Validators.required]),
        imagesource: new FormControl(null,[Validators.required]),
        color: new FormControl(null,[Validators.required]),
        screensize: new FormControl(null,[Validators.required]),
        sku: new FormControl(null,[Validators.required]),
        description: new FormControl(null,[Validators.required]),
      })

      if(this.id){
        this.productservice.getProductByID(this.id,'iPhones').subscribe(
          (data) => {
            if (data){
              this.form.get('name').setValue(data['name'])
              this.form.get('model').setValue(data['model'])
              this.form.get('price').setValue(data['price'])
              this.form.get('imagesource').setValue(data['imagesource'])
              this.form.get('color').setValue(data['color'])
              this.form.get('screensize').setValue(data['name'])
              this.form.get('sku').setValue(data['sku'])
              this.form.get('description').setValue(data['description'])
            }
          })
      }
    }

    else if(this.product=='Accessoirs'){
      this.form = new FormGroup({
        name: new FormControl(null,[Validators.required]),
        price: new FormControl(null,[Validators.required]),
        imagesource: new FormControl(null,[Validators.required]),
        description: new FormControl(null,[Validators.required]),
      })

      if(this.id){
        this.productservice.getProductByID(this.id,'Accessoirs').subscribe(
          (data) => {
            if (data){
              this.form.get('name').setValue(data['name'])
              this.form.get('price').setValue(data['price'])
              this.form.get('imagesource').setValue(data['imagesource'])
              this.form.get('description').setValue(data['description'])
            }
          })
      }
    }


    
  }


  onSubmit(){
    if (this.product=='iPhone'){
      this.productservice.createProducts('iphone',this.form);
      this.router.navigate(['/productmanager'],{queryParams:{product:'iphone'}})
    }
    else{
      this.productservice.createProducts('accessoir',this.form);
      this.router.navigate(['/productmanager',{product:'accessoir'}])
    }
  }


  onUpdate(){
    if (this.product=='iPhones'){
      this.productservice.updateProducts(this.product,this.form,this.id);
      this.router.navigate(['/productmanager',{product:'iphone'}]);
    }
    else{
      this.productservice.updateProducts(this.product,this.form,this.id);
      this.router.navigate(['/productmanager',{product:'accessoir'}])
    }
    this.productservice.fetchProducts(this.product);
  }

  onDelete(){
    this.productservice.deleteProduct(this.product,this.id)
    if (this.product=='iPhones'){
      this.router.navigate(['/productmanager',{product:'iphone'}])
    }
    else{
      this.router.navigate(['/productmanager',{product:'accessoir'}])
    }
    this.productservice.fetchProducts(this.product);
  }
}
