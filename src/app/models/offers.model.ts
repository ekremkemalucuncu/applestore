import { Accessoirs } from "./accessoirs.model";
import { Iphone } from "./iphone.model";

export class Offer{

    constructor(
        public name:string,
        public price:number,
        public id:string,
        public iphone:Iphone,
        public accessoir:Accessoirs
    ){
        price=(iphone.price+accessoir.price)*0.8
    }
}