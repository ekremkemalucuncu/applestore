import { Action } from "@ngrx/store";

export const LOADING="LOADING";
export const NOT_LOADING="NOT_LOADING"


export class Loading implements Action{
    readonly type=LOADING
}

export class NotLoading implements Action{
    readonly type=NOT_LOADING
}

export type LoadingActions = Loading |NotLoading