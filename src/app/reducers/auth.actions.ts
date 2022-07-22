import { Action } from "@ngrx/store";

export const AUTHENTICATED="AUTHENTICATED";
export const NOT_AUTHENTICATED="NOT_AUTHENTICATED"


export class Authenticated implements Action{
    readonly type=AUTHENTICATED
}

export class NotAuthenticated implements Action{
    readonly type=NOT_AUTHENTICATED
}

export type AuthActions = Authenticated |NotAuthenticated