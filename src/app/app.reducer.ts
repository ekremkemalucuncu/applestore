import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAuth from './shared/reducers/auth.reducer'
import * as fromLoading from './shared/reducers/loading.reducer'

export interface State {
    auth:fromAuth.State,
    loading:fromLoading.State
}


export const reducers: ActionReducerMap<State> ={
    auth:fromAuth.authenticationReducer,
    loading:fromLoading.loadingReducer
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.authenticationReducer);

export const getLoadingState = createFeatureSelector<fromLoading.State>('loading');
export const getIsLoading = createSelector(getLoadingState, fromLoading.loadingReducer);