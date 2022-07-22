import { AuthActions, AUTHENTICATED, NOT_AUTHENTICATED } from "./auth.actions";

export interface State{
    isAuth: boolean;
}

const initialState={
    isAuth:false
}

export function appReducer(state = initialState, action:AuthActions){
    switch (action.type){
        case AUTHENTICATED:
            return{
                isAuth:true
            }
        case NOT_AUTHENTICATED:
            return {
                isAuth:false
            }
        default:
            return state
    }
}


export const getIsAuthenticated = (state : State) => state.isAuth;
