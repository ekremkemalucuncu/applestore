import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Accessoir } from "../../shared/models/accessoirs.model";
import { Iphone } from "../../shared/models/iphone.model";
import { Offer } from "../../shared/models/offers.model"
import { iPhones, Accessoirs, Offers } from "../../shared/firestore.collections"
import { sliceNumber } from "../../shared/number.slice";



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  iPhoneList: Iphone[] = [];
  iPhoneBehavior = new BehaviorSubject<Iphone[]>([]);
  AccessoirList: Accessoir[] = [];
  AccessoirBehavior = new BehaviorSubject<Accessoir[]>([])
  OffersList: Offer[] = []
  OfferBehaviour = new BehaviorSubject<Offer[]>([])

  constructor(
    private db: AngularFirestore,
  ) { }

  getProductByID(id: string, desiredproduct: string) {
    if (desiredproduct == iPhones) {
      for (let product of this.iPhoneList) {
        if (product.id == id) {
          return product
        }
      }
    }
    else if (desiredproduct == Accessoirs) {
      for (let product of this.AccessoirList) {
        if (product.id == id) {
          return product
        }
      }
    }
    else if (desiredproduct == Offers) {
      for (let product of this.OffersList) {
        if (product.id == id) {
          return product
        }
      }
    }
    return []
  }
}
