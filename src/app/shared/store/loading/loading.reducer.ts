import { Action, createReducer, on} from "@ngrx/store";
import { Loading, NotLoading } from "./loading.actions";

export interface State{
    isLoaded: boolean;
}

const initialState={
    isLoaded:false
}

const _loadingReducer = createReducer(
    initialState,
    on(Loading, (state,action)=>({
        ...state,
        isLoaded:true
    })),
    on(NotLoading, (state,action)=>({
        ...state,
        isLoaded:false
    }))
)


export function loadingReducer(state=initialState,action:Action){
    return _loadingReducer(state,action)
}
