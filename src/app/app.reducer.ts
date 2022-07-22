import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAuth from './reducers/auth.reducer'


export interface State {
    auth:fromAuth.State
}


export const reducers: ActionReducerMap<State> ={
    auth:fromAuth.appReducer
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);