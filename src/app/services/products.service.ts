import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Accessoirs } from "../models/accessoirs.model";
import { Iphone } from "../models/iphone.model";



@Injectable({
    providedIn:'root'
})
export class ProductService {

    iPhoneList:Iphone[]=[];
    iPhoneBehavior = new BehaviorSubject<Iphone[]>([]);
    AccessoirList:Accessoirs[]=[];
    AccessoirBehavior = new BehaviorSubject<Accessoirs[]>([])

    constructor(
        private db:AngularFirestore,
    ){}


    fetchProducts(desiredproduct:string){
        if (desiredproduct=='iPhones'){
            this.iPhoneList=[]
        }
        else{
            this.AccessoirList=[]
        }
        this.db.collection(desiredproduct).get()
        .forEach(
            (products) => {
                products.forEach(
                    (product) =>{
                        let oneproduct:any=product.data();
                        if (desiredproduct=='iPhones')
                        {
                            let newProduct = new Iphone
                            for (let key in oneproduct){
                                newProduct[key]=oneproduct[key]
                            }
                            newProduct.id=product.id
                            this.iPhoneList.push(newProduct)
                        }
                        else 
                        {
                            let newProduct = new Accessoirs
                            for (let key in oneproduct){
                                newProduct[key]=oneproduct[key]
                            }
                            newProduct.id=product.id
                            this.AccessoirList.push(newProduct)
                        }                        
                    }
                )
            }
        )
    }
                    
    getProduct(product:string){
        if (product=='iphone'){
            this.iPhoneBehavior.next(this.iPhoneList)
            return this.iPhoneBehavior
        }
        else{
            this.AccessoirBehavior.next(this.AccessoirList)
            return this.AccessoirBehavior
        }
    }


    createProducts(product:string,form:FormGroup){
        if (product == 'iphone'){
                this.db.collection('iPhones').add(
                {
                name:form.value.name,
                price:form.value.price,
                imagesource:form.value.imagesource,
                color:form.value.color,
                screensize:form.value.screensize,
                description:form.value.description,
                sku:form.value.sku,
                model:form.value.model
                })
        }
        else{
            this.db.collection('Accessoirs').add(
                { 
                    name:form.value.name,
                    price:form.value.price,
                    imagesource:form.value.imagesource
                }
            )
        }
    }

    getProductByID(id:string,desiredproduct:string){
        let returndata= new BehaviorSubject<any>({});
        this.db.collection(desiredproduct).get()
        .forEach(
            (products) => {
                products.forEach(
                    (product) => {
                        if(product.id==id){
                            returndata.next(
                                product.data()
                            )
                        }
                    }
                )
            }
        )
        return returndata
    }


    updateProducts(desiredproduct:string,form:FormGroup,id:string){
        if (desiredproduct=='iPhones'){
            this.db.collection(desiredproduct).doc(id).update(
                {
                    name:form.value.name,
                    price:form.value.price,
                    imagesource:form.value.imagesource,
                    color:form.value.color,
                    screensize:form.value.screensize,
                    description:form.value.description,
                    sku:form.value.sku,
                    model:form.value.model
                }
                ).finally(() => {console.log('ekrm')})
        }
        else {
            this.db.collection(desiredproduct).doc(id).set(
                {
                    name:form.value.name,
                    price:form.value.price,
                    imagesource:form.value.imagesource,
                    description:form.value.description,
                }
                )
                .finally(() => {console.log('ekrm')})

        }
        }

    deleteProduct(desiredproduct:string,id:string){
        this.db.collection(desiredproduct).doc(id).delete()
    }
}