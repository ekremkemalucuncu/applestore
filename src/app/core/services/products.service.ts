import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Accessoir } from "../../shared/models/accessoirs.model";
import { Iphone } from "../../shared/models/iphone.model";
import { Offer } from "../../shared/models/offers.model"
import { iPhones, Accessoirs, Offers} from "../../shared/firestore.collections"
import { sliceNumber } from "../../shared/number.slice";



@Injectable({
    providedIn:'root'
})
export class ProductService {

    iPhoneList:Iphone[]=[];
    iPhoneBehavior = new BehaviorSubject<Iphone[]>([]);
    AccessoirList:Accessoir[]=[];
    AccessoirBehavior = new BehaviorSubject<Accessoir[]>([])
    OffersList:Offer[]=[]
    OfferBehaviour= new BehaviorSubject<Offer[]>([])
    
    constructor(
        private db:AngularFirestore,
    ){}


    fetchProducts(desiredproduct:string){
        if (desiredproduct==iPhones){
            this.iPhoneList=[]
            this.iPhoneBehavior.next(this.iPhoneList)
        }
        else if (desiredproduct==Accessoirs){
            this.AccessoirList=[]
            this.AccessoirBehavior.next(this.AccessoirList)
        }
        else if(desiredproduct ==Offers){
            this.OffersList=[]
            this.OfferBehaviour.next(this.OffersList)
        }
        this.db.collection(desiredproduct).get()
        .forEach(
            (products) => {
                products.forEach(
                    (product) =>{
                        let oneproduct:any=product.data();
                        if (desiredproduct==iPhones)
                        {
                            let newProduct = new Iphone
                            for (let key in oneproduct){
                                newProduct[key]=oneproduct[key]
                            }
                            newProduct.id=product.id
                            this.iPhoneList.push(newProduct)
                        }
                        else if(desiredproduct==Accessoirs)
                        {
                            let newProduct = new Accessoir
                            for (let key in oneproduct){
                                newProduct[key]=oneproduct[key]
                            }
                            newProduct.id=product.id
                            this.AccessoirList.push(newProduct)
                        }
                        else if (desiredproduct==Offers){
                            let newProduct = new Offer
                            for (let key in oneproduct){
                                if (key=='iphone'){
                                    oneproduct[key].get()
                                    .then(
                                        (result) =>{
                                            let newOfferIphone = new Iphone
                                            for (let field in result.data()){
                                                newOfferIphone[field]=result.data()[field]
                                            }
                                            newOfferIphone.id=result.id
                                            newProduct[key]=newOfferIphone;
                                        }
                                    )
                                }
                                else if (key=='accessoir'){
                                    oneproduct[key].get()
                                    .then(
                                        (result) =>{
                                            let newOfferAccessoir = new Accessoir
                                            for (let field in result.data()){
                                                newOfferAccessoir[field]=result.data()[field]
                                            }
                                            newOfferAccessoir.id=result.id
                                            newProduct[key]=newOfferAccessoir;
                                        }
                                    )
                                }
                                else{
                                    newProduct[key]=oneproduct[key]
                                }
                            }
                            newProduct.id=product.id
                            this.OffersList.push(newProduct)
                        }                       
                    }
                )
            }
        )
    }
                    
    getProduct(product:string){
        if (product==iPhones){
            this.iPhoneBehavior.next(this.iPhoneList)
            return this.iPhoneBehavior
        }
        else if(product==Accessoirs){
            this.AccessoirBehavior.next(this.AccessoirList)
            return this.AccessoirBehavior
        }
        else if(product ==Offers){
            this.OfferBehaviour.next(this.OffersList)
            return this.OfferBehaviour
        }
        else {
            return new BehaviorSubject<any[]>([])
        }
    }


    createProducts(product:string,form:FormGroup){
        if (product == iPhones){
            this.db.collection(product).add(
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
        else if(product==Accessoirs){
            this.db.collection(product).add(
                { 
                    name:form.value.name,
                    price:form.value.price,
                    imagesource:form.value.imagesource
                }
            )
        }
        else if(product==Offers){
            this.db.doc('/iPhones/'+form.value.iphone).get().forEach(
                fieldiphone => {
                   this.db.doc('/Accessoirs/'+form.value.accessoir).get().forEach(
                    fieldaccessoir => {
                        this.db.collection(product).add(
                            { 
                                iphone:this.db.doc('/iPhones/'+form.value.iphone).ref,
                                accessoir:this.db.doc('/Accessoirs/'+form.value.accessoir).ref,
                                name:form.value.name,
                                price:form.value.price,
                                oldprice:fieldiphone.data()['price']+fieldaccessoir.data()['price'],
                                rate: sliceNumber(100-(form.value.price/(fieldiphone.data()['price']+fieldaccessoir.data()['price']))*100,5)
                            }
                        )
                    }
                   )
                }
                )
            }
        }

    getProductByID(id:string,desiredproduct:string){
        if(desiredproduct==iPhones){
            for (let product of this.iPhoneList){
                if(product.id==id){
                    return product
                }
            }
            }
        else if(desiredproduct ==Accessoirs){
            for (let product of this.AccessoirList){
                if(product.id==id){
                    return product
                }
            }
        }
        else if(desiredproduct==Offers){
            for (let product of this.OffersList){
                if(product.id==id){
                    return product
                }
            }
        }
        return []
    }


    updateProducts(desiredproduct:string,form:FormGroup,id:string){
        if (desiredproduct==iPhones){
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
                )
        }
        else if(desiredproduct==Accessoirs) {
            this.db.collection(desiredproduct).doc(id).update(
                {
                    name:form.value.name,
                    price:form.value.price,
                    imagesource:form.value.imagesource,
                    description:form.value.description,
                }
                )
        }
        else if(desiredproduct==Offers) {
            this.db.doc('/iPhones/'+form.value.iphone).get().forEach(
                fieldiphone => {
                    this.db.doc('/Accessoirs/'+form.value.accessoir).get().forEach(
                    fieldaccessoir => {
                        this.db.collection(desiredproduct).doc(id).update(
                            { 
                                iphone:this.db.doc('/iPhones/'+form.value.iphone).ref,
                                accessoir:this.db.doc('/Accessoirs/'+form.value.accessoir).ref,
                                name:form.value.name,
                                price:form.value.price,
                                oldprice:fieldiphone.data()['price']+fieldaccessoir.data()['price'],
                                rate: sliceNumber(100-(form.value.price/(fieldiphone.data()['price']+fieldaccessoir.data()['price']))*100,5)
                            }
                        )
                    }
                    )
                }
                )
        }
        }

        
    deleteProduct(desiredproduct:string,id:string){
        this.db.collection(desiredproduct).doc(id).delete()
    }
}