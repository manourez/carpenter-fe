import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './ceiling.action';
import { CeilingService } from '../service/ceiling.service';
import { SET_ALERT } from '../../alert/store/alert.actions';

@Injectable()
export class CeilingEffects {
  fetchCeilings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TRY_FETCH_CEILINGS),
      mergeMap(() =>
        this.ceilingService.fetchCeilings().pipe(
          map((response) =>
            actions.FETCH_CEILINGS_SUCCESS({
              ceilings: response,
            })
          ),
          catchError(() =>
            of(
              SET_ALERT({
                alert: {
                  type: 'error',
                  message: 'Impossible de récupérer la liste des plafonds !',
                  timeout: 10000,
                },
              })
            )
          )
        )
      )
    )
  );

  fetchPerformances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TRY_FETCH_PERFORMANCES),
      mergeMap(() =>
        this.ceilingService.fetchPerformances().pipe(
          map((response) =>
            actions.FETCH_PERFORMANCES_SUCCESS({
              performances: response,
            })
          ),
          catchError(() =>
            of(
              SET_ALERT({
                alert: {
                  type: 'error',
                  message:
                    'Impossible de récupérer la liste des performances !',
                  timeout: 10000,
                },
              })
            )
          )
        )
      )
    )
  );

  fetchCeiling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TRY_FETCH_CEILING),
      mergeMap((ceiling) =>
        this.ceilingService.getCeiling(ceiling.id).pipe(
          map((response) =>
            actions.FETCH_CEILING_SUCCESS({
              ceiling: response,
            })
          ),
          catchError(() =>
            of(
              SET_ALERT({
                alert: {
                  type: 'error',
                  message: 'Impossible de récupérer ce plafond !',
                  timeout: 10000,
                },
              })
            )
          )
        )
      )
    )
  );

  addCeiling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TRY_ADD_CEILING),
      mergeMap((ceiling) =>
        this.ceilingService.addCeiling(ceiling.ceiling).pipe(
          switchMap(() => [
            SET_ALERT({
              alert: {
                type: 'success',
                message: 'Le plafond a été ajouté avec succès !',
                timeout: 5000,
              },
            }),
            actions.TRY_FETCH_CEILINGS(),
          ]),
          catchError(() =>
            of(
              SET_ALERT({
                alert: {
                  type: 'error',
                  message: "Impossible d'ajouter ce plafond !",
                  timeout: 10000,
                },
              })
            )
          )
        )
      )
    )
  );

  updateCeiling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TRY_UPDATE_CEILING),
      mergeMap((ceiling) =>
        this.ceilingService.updateCeiling(ceiling.id, ceiling.ceiling).pipe(
          switchMap(() => [
            SET_ALERT({
              alert: {
                type: 'success',
                message: 'Le plafond a été modifié avec succès !',
                timeout: 5000,
              },
            }),
            actions.TRY_FETCH_CEILINGS(),
          ]),
          catchError(() =>
            of(
              SET_ALERT({
                alert: {
                  type: 'error',
                  message: 'Impossible de modifier ce plafond !',
                  timeout: 10000,
                },
              })
            )
          )
        )
      )
    )
  );

  deleteCeiling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TRY_DELETE_CEILING),
      mergeMap((ceiling) =>
        this.ceilingService.deleteCeiling(ceiling.id).pipe(
          switchMap(() => [
            SET_ALERT({
              alert: {
                type: 'success',
                message: 'Le plafond a été supprimé avec succès !',
                timeout: 5000,
              },
            }),
            actions.TRY_FETCH_CEILINGS(),
          ]),
          catchError(() =>
            of(
              SET_ALERT({
                alert: {
                  type: 'error',
                  message: 'Impossible de Supprimer ce plafond !',
                  timeout: 10000,
                },
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ceilingService: CeilingService
  ) {}
}
