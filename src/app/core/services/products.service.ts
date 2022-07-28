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
}
