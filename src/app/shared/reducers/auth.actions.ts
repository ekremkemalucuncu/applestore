import { createAction, props } from '@ngrx/store';

export const LoginStarted = createAction(
  'LOGIN_STARTED',
  props<{ email:string, password:string }>()
  )

export const LoginFails = createAction(
  'LOGIN_FAILS',
  props<{ error: string }>()
)

export const SignupStarted = createAction(
  'SIGNUP_STARTED',
  props<{ email:string, password:string }>()
  )

export const SignupFails = createAction(
  'SIGNUP_FAILS',
  props<{ error: string }>()
)

export const Authenticated = createAction(
  'AUTHENTICATED'
)

export const NotAuthenticated = createAction(
  'NOT_AUTHENTICATED'
)

export const FailedAuthentication = createAction(
  'FAILED_AUTHENTICATON'
)

export const LogOut = createAction(
  'LOG_OUT'
)
