import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuth from './shared/store/auth/auth.reducer';
import * as fromProduct from './shared/store/products/products.reducer';

export interface State {
  auth: fromAuth.State;
  product: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authenticationReducer,
  product: fromProduct.productRecuders,
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.authenticationReducer
);
