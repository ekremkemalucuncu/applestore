import { Action, createReducer, on} from "@ngrx/store";
import { Authenticated, NotAuthenticated, FailedAuthentication } from "./auth.actions";

export interface State{
    isAuth: boolean;
}

const initialState={
    isAuth:false,
}


const _authenticationReducer = createReducer(
    initialState,
    on(Authenticated, (state,action)=>({
        ...state,
        isAuth:true
    })),
    on(NotAuthenticated, (state,action)=>({
        ...state,
        isAuth:false
    })),
    on(FailedAuthentication, (state,action)=>({
        ...state,
        isAuth:false
    }))
)


export function authenticationReducer(state=initialState,action:Action){
    return _authenticationReducer(state,action)
}

