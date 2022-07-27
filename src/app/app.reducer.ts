import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
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
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.authenticationReducer);

export const getLoadingState = createFeatureSelector<fromLoading.State>('loading');
export const getIsLoading = createSelector(getLoadingState, fromLoading.loadingReducer);
