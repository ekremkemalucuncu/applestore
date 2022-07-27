import { createAction, props } from '@ngrx/store';

export const getPhonesStarted = createAction(
  "GET_PHONES_STARTED",
)

export const getPhonesSuccess = createAction(
  "GET_PHONES_SUCCESS",
  props<{ payload: any[] }>()
)

export const getPhonesFails = createAction(
  "GET_PHONES_FAILS",
  props<{ payload: string }>()
)

export const createPhoneStarted = createAction(
  "CREATE_PHONE_STARTED",
  props<{ payload: any }>()
)
