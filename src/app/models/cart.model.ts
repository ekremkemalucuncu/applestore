import { Accessoirs } from "./accessoirs.model";
import { Iphone } from "./iphone.model";

export class CartItem{

    constructor(
        public element:Iphone|Accessoirs,
        public quantity:number,
        public totalprice:number
    ){
        totalprice=element.price*quantity
    }

    updateTotalPrice(new_quantity:number){
        this.totalprice=this.element.price*new_quantity
    }
}