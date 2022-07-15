import { createAction, props } from '@ngrx/store';
import { CreateUser, User } from '../../signup/interfaces';

export const TRY_LOGIN_USER = createAction(
  '[User] Try to login a user',
  props<CreateUser>()
);

export const LOGIN_SUCCESS = createAction(
  '[User] login success',
  props<{ user: User }>()
);

export const LOGOUT = createAction('[User] logout success');
