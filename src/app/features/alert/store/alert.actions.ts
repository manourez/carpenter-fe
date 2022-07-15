import { createAction, props } from '@ngrx/store'
import { Alert } from './alert.reducer'

export const SET_ALERT = createAction(
  '[Alert] Set alert',
  props<{ alert: Alert }>(),
)

export const CLEAR_ALERT = createAction('[Alert] Clear alert')
