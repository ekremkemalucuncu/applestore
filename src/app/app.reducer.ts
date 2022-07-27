import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
<<<<<<< HEAD
import * as fromAuth from './shared/store/auth/auth.reducer'
import * as fromLoading from './shared/store/loading/loading.reducer'
import * as fromProduct from './shared/store/products/products.reducer'

export interface State {
    auth:fromAuth.State,
    loading:fromLoading.State,
    product:fromProduct.State
}


export const reducers: ActionReducerMap<State> ={
    auth:fromAuth.authenticationReducer,
    loading:fromLoading.loadingReducer,
    product:fromProduct.productRecuders
=======
import * as fromAuth from './shared/reducers/auth.reducer'
import * as fromLoading from './shared/reducers/loading.reducer'
import * as fromPhones from './shared/reducers/phones/phones.reducer'

export interface State {
  auth: fromAuth.State,
  loading: fromLoading.State,
  phones: fromPhones.State
}


export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authenticationReducer,
  loading: fromLoading.loadingReducer,
  phones: fromPhones.phonesReducer
>>>>>>> 544149201b588bfffcf8d6ee14362ecc25c4a210
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.authenticationReducer);

export const getLoadingState = createFeatureSelector<fromLoading.State>('loading');
export const getIsLoading = createSelector(getLoadingState, fromLoading.loadingReducer);
