import { Action, createReducer, on } from "@ngrx/store"
import * as phonesActions from "./phones.actions";

export interface State {
  phones: any[],
  phonesLoaded: boolean,
  phonesLoading: boolean,
  getPhonesError: string
}

const initialState: State = {
  phones: [],
  phonesLoaded: false,
  phonesLoading: false,
  getPhonesError: null
}

const _phonesReducer = createReducer(
  initialState,
  on(phonesActions.getPhonesStarted, (state, action) => ({
    ...state,
    phonesLoading: true
  })),
  on(phonesActions.getPhonesSuccess, (state, action) => ({
    ...state,
    phonesLoading: false,
    phones: action.payload,
    phonesLoaded: true,
    getPhonesError: null
  })),
  on(phonesActions.getPhonesFails, (state, action) => ({
    ...state,
    phonesLoading: false,
    phones: [],
    phonesLoaded: false,
    getPhonesError: action.payload
  })),
);

export function phonesReducer(state = initialState, action: Action) {
  return _phonesReducer(state, action)
}
