import { createAction, props } from '@ngrx/store';
import {
  Ceiling,
  CeilingPerf,
  CreateCeiling,
  UpdateCeiling,
} from '../interfaces';

export const TRY_FETCH_CEILINGS = createAction(
  '[Ceilings] Try to fetch ceilings'
);

export const FETCH_CEILINGS_SUCCESS = createAction(
  '[Ceilings] Fetch ceilings succeed',
  props<{ ceilings: Ceiling[] }>()
);

export const TRY_FETCH_PERFORMANCES = createAction(
  '[Performances] Try to fetch performances'
);

export const FETCH_PERFORMANCES_SUCCESS = createAction(
  '[Performances] Fetch performances succeed',
  props<{ performances: CeilingPerf[] }>()
);

export const TRY_FETCH_CEILING = createAction(
  '[Ceiling] Try to fetch ceiling',
  props<{ id: number }>()
);

export const FETCH_CEILING_SUCCESS = createAction(
  '[Ceiling] Fetch ceiling succeed',
  props<{ ceiling: Ceiling }>()
);

export const TRY_ADD_CEILING = createAction(
  '[Ceiling] Try to add a ceiling',
  props<{ ceiling: CreateCeiling }>()
);

export const TRY_UPDATE_CEILING = createAction(
  '[Ceiling] Try to update a ceiling',
  props<{ id: number; ceiling: UpdateCeiling }>()
);

export const TRY_DELETE_CEILING = createAction(
  '[Ceiling] Try to delete a ceiling',
  props<{ id: number }>()
);
