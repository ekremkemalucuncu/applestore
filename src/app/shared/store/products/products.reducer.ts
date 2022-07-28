import { FormGroup } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store"
import { Accessoir } from "../../models/accessoirs.model";
import { Iphone } from "../../models/iphone.model";
import { Offer } from "../../models/offers.model";
import * as productsActions from "./products.actions";


export interface State {
    iphones: Iphone[],
    iphonesLoaded: boolean,
    iphonesLoading: boolean,
    getIPhonesError: string,
    iphoneForm:FormGroup,
    iphoneFormEdit:FormGroup,
    iphoneid:string,
    iphonesupdating:boolean,
    accessoirs: Accessoir[],
    accessoirsLoaded: boolean,
    accessoirsLoading: boolean,
    getAccessoirsError: string,
    offers: Offer[],
    offersLoaded: boolean,
    offersLoading: boolean,
    getOffersError: string,
  }
  
  
  const initialState: State = {
    iphones: [],
    iphonesLoaded: false,
    iphonesLoading: false,
    getIPhonesError: null,
    iphoneForm:null,
    iphoneFormEdit:null,
    iphoneid:null,
    iphonesupdating:false,
    accessoirs: [],
    accessoirsLoaded: false,
    accessoirsLoading: false,
    getAccessoirsError: null,
    offers: [],
    offersLoaded: false,
    offersLoading: false,
    getOffersError: null,
  }
  

  const _productRecuders = createReducer(
    initialState,
    on(productsActions.getIPhonesStarted,(state,action) => ({
        ...state,
        iphonesLoading:true
    })),
    on (productsActions.getIPhonesSuccess,(state,action) => ({
        ...state,
        iphonesLoading:false,
        iphones:action.payload,
        iphonesLoaded:true,
        getIPhonesError:null
    })),
    on(productsActions.getIPhonesFail,(state,action) =>({
        ...state,
        iphonesLoading:false,
        iphones:[],
        iphonesLoaded:false,
        getIPhonesError:action.payload
    })),

    on(productsActions.getIPhonesEditStarted,(state,action) => ({
        ...state,
        iphoneid:action.payload

    })),
    on(productsActions.getIPhonesEditSuccess,(state,action) => ({
        ...state,
        iphoneFormEdit:action.payload

    })),

    on(productsActions.getIPhonesUpdateStarted,(state,action) => ({
        ...state,
        iphoneForm:action.payload,
        iphoneid:action.id,
        iphonesupdating:true
    })),
    on(productsActions.getIPhonesUpdateStarted,(state,action) => ({
        ...state,
        iphoneForm:action.payload,
        iphoneid:action.id,
        iphonesupdating:true
    })),
    on (productsActions.getIPhonesUpdateSuccess,(state,action) => ({
        ...state,
        iphonesLoaded:false,
        iphones:action.payload,
        getIPhonesError:null,
        iphonesupdating:false
    })),
    on(productsActions.getIPhonesUpdateFail,(state,action) =>({
        ...state,
        iphonesLoading:false,
        iphones:[],
        getIPhonesError:action.payload,
        iphonesupdating:false

    })),

    on(productsActions.getAccessoirsStarted,(state,action) => ({
        ...state,
        accessoirsLoading:true
    })),
    on (productsActions.getAccessoirsSuccess,(state,action) => ({
        ...state,
        accessoirsLoading:false,
        accessoirs:action.payload,
        accessoirsLoaded:true,
        getAccessoirsError:null
    })),
    on(productsActions.getAccessoirsFail,(state,action) =>({
        ...state,
        accessoirsLoading:false,
        accessoirsLoaded:false,
        accessoirs:[],
        getAccessoirsError:action.payload
    })),

    on(productsActions.getOffersStarted,(state,action) => ({
        ...state,
        offersLoading:true
    })),
    on (productsActions.getOffersSuccess,(state,action) => ({
        ...state,
        offersLoading:false,
        offers:action.payload,
        offersLoaded:true,
        getOffersError:null
    })),
    on(productsActions.getOffersFail,(state,action) =>({
        ...state,
        offersLoading:false,
        offersLoaded:false,
        offers:[],
        getOffersError:action.payload
    })),
  )


  export function productRecuders(state=initialState,action:Action){
    return _productRecuders(state,action)
  }