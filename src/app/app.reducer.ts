import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAuth from './reducers/auth.reducer'
import * as fromLoading from './reducers/loading.reducer'

export interface State {
    auth:fromAuth.State,
    loading:fromLoading.State
}


export const reducers: ActionReducerMap<State> ={
    auth:fromAuth.appReducer,
    loading:fromLoading.appReducer
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getLoadingState = createFeatureSelector<fromLoading.State>('loading');
export const getIsLoading = createSelector(getLoadingState, fromLoading.getIsLoaded);