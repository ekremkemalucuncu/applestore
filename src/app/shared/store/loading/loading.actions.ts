import { createAction } from "@ngrx/store";



export const Loading = createAction(
    'LOADING'
)

export const NotLoading =createAction(
    'NOT_LOADING'
)
