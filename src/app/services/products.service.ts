import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";





@Injectable({
    providedIn:'root'
})
export class ProductService {


    constructor(
        private db:AngularFirestore
    ){}


    fetchProducts(){
        return this.db.collection('iPhones').valueChanges()
    }

    getProducts(){

    }

}