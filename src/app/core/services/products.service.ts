import { Injectable } from "@angular/core";
import { Accessoir } from "../../shared/models/accessoirs.model";
import { Iphone } from "../../shared/models/iphone.model";
import { Offer } from "../../shared/models/offers.model"
import { iPhones, Accessoirs, Offers } from "../../shared/firestore.collections"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  iPhoneList: Iphone[] = [];
  AccessoirList: Accessoir[] = [];
  OffersList: Offer[] = []

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
    return {}
  }
}
