import { createFeature, createReducer, on } from '@ngrx/store'
import * as AlertActions from './alert.actions'

export interface Alert {
  type: 'error' | 'success'
  message: string
  timeout: number
}

export interface AlertState {
  alert: Alert | null
}

const initialState: AlertState = {
  alert: null,
}

export const alertFeature = createFeature({
  name: 'alert',
  reducer: createReducer(
    initialState,
    on(AlertActions.SET_ALERT, (state, { alert }) => {
      return { ...state, alert }
    }),
    on(AlertActions.CLEAR_ALERT, (state) => {
      return { ...state, alert: null }
    }),
  ),
})

export const { name, reducer, selectAlert } = alertFeature
