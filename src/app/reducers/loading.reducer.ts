import { LoadingActions, LOADING, NOT_LOADING } from "./loading.actions";

export interface State{
    isLoaded: boolean;
}

const initialState={
    isLoaded:false
}

export function appReducer(state = initialState, action:LoadingActions){
    switch (action.type){
        case LOADING:
            return{
                isLoaded:true
            }
        case NOT_LOADING:
            return {
                isLoaded:false
            }
        default:
            return state
    }
}


export const getIsLoaded = (state : State) => state.isLoaded;
