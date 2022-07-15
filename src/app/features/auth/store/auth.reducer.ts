import { createFeature, createReducer, on } from '@ngrx/store';
import * as actions from './auth.action';
import { User } from '../../signup/interfaces';

interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const authFeatures = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(actions.LOGIN_SUCCESS, (state, { user }) => ({
      ...state,
      user,
    })),
    on(actions.LOGOUT, (state) => ({
      ...state,
      user: null,
    }))
  ),
});

export const { name, reducer, selectAuthState, selectUser } = authFeatures;
