import { Action, createReducer, on } from "@ngrx/store";
import { Authenticated, NotAuthenticated, FailedAuthentication, LoginStarted, LoginFails, SignupStarted, SignupFails, LogOut } from './auth.actions';

export interface State {
  isAuth: boolean;
  isLoginInProgress: boolean;
  loginError: string
  isSignupInProgress: boolean;
  signupError: string
}

const initialState : State= {
  isAuth: false,
  isLoginInProgress: false,
  loginError: "",
  isSignupInProgress: false,
  signupError: ""
}


const _authenticationReducer = createReducer(
  initialState,
  on(LoginStarted, (state, action) => ({
    ...state,
    isLoginInProgress: true,
    loginError: "",
  })),
  on(LoginFails, (state, action) => ({
    ...state,
    isLoginInProgress: false,
    loginError: action.error,
    isAuth: false
  })),
  on(SignupStarted, (state, action) => ({
    ...state,
    isSignupInProgress: true,
    signupError: "",
  })),
  on(SignupFails, (state, action) => ({
    ...state,
    isSignupInProgress: false,
    signupError: action.error,
    isAuth: false
  })),
  on(Authenticated, (state, action) => ({
    ...state,
    isAuth: true,
    loginError: "",
    isLoginInProgress: false,

  })),
  on(NotAuthenticated, (state, action) => ({
    ...state,
    isAuth: false
  })),
  on(FailedAuthentication, (state, action) => ({
    ...state,
    isAuth: false
  })),
  on(LogOut, (state, action) => ({
    ...state,
    isAuth: false
  }))
)


export function authenticationReducer(state = initialState, action: Action) {
  return _authenticationReducer(state, action)
}

