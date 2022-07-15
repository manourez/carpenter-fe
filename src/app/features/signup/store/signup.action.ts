import { createAction, props } from '@ngrx/store';
import { CreateUser, User } from '../interfaces';

export const TRY_CREATE_USER = createAction(
  '[User] Try to create a user',
  props<CreateUser>()
);

export const SET_USER_SIGNUP = createAction(
  '[User] try to set a user from signup',
  props<{ user: User }>()
);
