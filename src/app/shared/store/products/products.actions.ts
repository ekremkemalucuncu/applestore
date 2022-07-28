import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { Accessoir } from "../../models/accessoirs.model";
import { Iphone } from "../../models/iphone.model";
import { Offer } from "../../models/offers.model";

export const getIPhonesStarted = createAction(
  "GET_IPHONES_STARTED"
)

export const getIPhonesSuccess = createAction(
  "GET_IPHONES_SUCCESS",
  props<{ payload: Iphone[] }>()
)

export const getIPhonesFail = createAction(
  "GET_IPHONES_FAIL",
  props<{ payload: string }>()
)

export const getIPhonesEditStarted = createAction(
  "GET_IPHONES_EDIT_STARTED",
  props<{ payload: string }>()
)

export const getIPhonesEditSuccess = createAction(
  "GET_IPHONES_EDIT_SUCCESS",
  props<{ payload: FormGroup }>()
)

export const createIphonesStarted = createAction(
  "CREATE_IPHONE_STARTED",
  props<{ data: any }>()
)

export const createIphoneSuccess = createAction(
  "CREATE_IPHONE_SUCCESS"
)

export const createIphoneFail = createAction(
  "CREATE_IPHONE_SUCCESS",
  props<{ payload: string }>()
)

export const updateIphonesStarted = createAction(
  "UPDATE_IPHONE_STARTED",
  props<{ id: string, data: any }>()
)

export const updateIphoneSuccess = createAction(
  "UPDATE_IPHONE_SUCCESS"
)

export const updateIphoneFail = createAction(
  "UPDATE_IPHONE_SUCCESS",
  props<{ payload: string }>()
)

export const getIPhonesUpdateSuccess = createAction(
  "GET_IPHONES_UPDATE_SUCCESS",
  props<{ payload: Iphone[] }>()
)

export const getIPhonesUpdateFail = createAction(
  "GET_IPHONES_UPDATE_FAIL",
  props<{ payload: string }>()
)

export const getAccessoirsStarted = createAction(
  "GET_ACCESSOIRS_STARTED"
)

export const getAccessoirsSuccess = createAction(
  "GET_ACCESSOIRS_SUCCESS",
  props<{ payload: Accessoir[] }>()

)

export const getAccessoirsFail = createAction(
  "GET_ACCESSOIRS_FAIL",
  props<{ payload: string }>()
)

export const getOffersStarted = createAction(
  "GET_OFFERS_STARTED"
)

export const getOffersSuccess = createAction(
  "GET_OFFERS_SUCCESS",
  props<{ payload: Offer[] }>()

)

export const getOffersFail = createAction(
  "GET_OFFERS_FAIL",
  props<{ payload: string }>()
)

export const updateAccessoirStarted = createAction(
  "UPDATE_ACCESSOIR_STARTED",
  props<{ id: string, data: any }>()
)

export const updateAccessoirSuccess = createAction(
  "UPDATE_ACCESSOIR_SUCCESS"
)

export const updateAccessoirFail = createAction(
  "UPDATE_ACCESSOIR_SUCCESS",
  props<{ payload: string }>()
)

export const createAccessoirStarted = createAction(
  "CREATE_ACCESSOIR_STARTED",
  props<{ data: any }>()
)

export const createAccessoirSuccess = createAction(
  "CREATE_ACCESSOIR_SUCCESS"
)

export const createAccessoirFail = createAction(
  "CREATE_ACCESSOIR_SUCCESS",
  props<{ payload: string }>()
)

export const deleteIphoneStarted = createAction(
  "DELETE_PHONE_STARTED",
  props<{ id: string }>()
)

export const deleteIphoneSuccess = createAction(
  "DELETE_PHONE_FAIL",
)

export const deleteIphoneFail = createAction(
  "DELETE_PHONE_SUCCESS",
  props<{ payload: string }>()
)

export const deleteAccessoirStarted = createAction(
  "DELETE_ACCESSOIR_STARTED",
  props<{ id: string }>()
)

export const deleteAccessoirSuccess = createAction(
  "DELETE_ACCESSOIR_SUCCESS",
)

export const deleteAccessoirFail = createAction(
  "DELETE_ACCESSOIR_FAIL",
  props<{ payload: string }>()
)

export const deleteOfferStarted = createAction(
  "DELETE_OFFER_STARTED",
  props<{ id: string }>()
)

export const deleteOfferSuccess = createAction(
  "DELETE_OFFER_SUCCESS",
)

export const deleteOfferFail = createAction(
  "DELETE_AOFFER_FAIL",
  props<{ payload: string }>()
)
