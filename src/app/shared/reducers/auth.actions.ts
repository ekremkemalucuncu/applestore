import { Action, createAction } from "@ngrx/store";




export const Authenticated =createAction(
    'AUTHENTICATED'
)


export const NotAuthenticated =createAction(
    'NOT_AUTHENTICATED'
)


export const FailedAuthentication =createAction(
    'FAILED_AUTHENTICATON'
)

