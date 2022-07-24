import { Action } from "@ngrx/store";

export const AUTHENTICATED="AUTHENTICATED";
export const NOT_AUTHENTICATED="NOT_AUTHENTICATED"
export const FAILED_AUTHENTICATON="FAILED_AUTHENTICATON"

export class Authenticated implements Action{
    readonly type=AUTHENTICATED
}

export class NotAuthenticated implements Action{
    readonly type= NOT_AUTHENTICATED;
}

export class FailedAuthentication implements Action{
    readonly type=FAILED_AUTHENTICATON;
}

export type AuthActions = Authenticated | NotAuthenticated |FailedAuthentication