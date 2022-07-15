import { createFeature, createReducer, on } from '@ngrx/store';
import * as actions from './ceiling.action';
import { Ceiling, CeilingPerf } from '../interfaces';

interface State {
  ceilings: Ceiling[];
  performances: CeilingPerf[];
  ceiling: Ceiling;
}

export const initialState: State = {
  ceilings: [],
  performances: [],
  ceiling: {} as Ceiling,
};

export const ceilingFeatures = createFeature({
  name: 'ceiling',
  reducer: createReducer(
    initialState,
    on(actions.FETCH_CEILINGS_SUCCESS, (state, { ceilings }) => ({
      ...state,
      ceilings,
    })),
    on(actions.FETCH_PERFORMANCES_SUCCESS, (state, { performances }) => ({
      ...state,
      performances,
    })),
    on(actions.FETCH_CEILING_SUCCESS, (state, { ceiling }) => ({
      ...state,
      ceiling,
    }))
  ),
});

export const {
  name,
  reducer,
  selectCeilingState,
  selectCeiling,
  selectCeilings,
  selectPerformances,
} = ceilingFeatures;
