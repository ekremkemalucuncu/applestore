import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
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
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.authenticationReducer);

export const getLoadingState = createFeatureSelector<fromLoading.State>('loading');
export const getIsLoading = createSelector(getLoadingState, fromLoading.loadingReducer);
