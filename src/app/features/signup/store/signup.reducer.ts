import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../interfaces';
import * as actions from './signup.action';

interface State {
  userFromSignUp: User | null;
}

export const initialState: State = {
  userFromSignUp: null,
};

export const signUpFeatures = createFeature({
  name: 'signup',
  reducer: createReducer(
    initialState,
    on(actions.SET_USER_SIGNUP, (state, { user }) => ({
      ...state,
      user,
    }))
  ),
});

export const { name, reducer, selectSignupState, selectUserFromSignUp } =
  signUpFeatures;
