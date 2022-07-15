import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './signup.action';
import { SET_ALERT } from '../../alert/store/alert.actions';
import { SignupService } from '../service/signup.service';

@Injectable()
export class UserEffects {
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TRY_CREATE_USER),
      mergeMap(({ type, ...user }) =>
        this.signUpService.signUp(user).pipe(
          switchMap(() => [
            SET_ALERT({
              alert: {
                type: 'success',
                message: "L'utilisateur a été crééé avec succès !",
                timeout: 5000,
              },
            }),
          ]),
          catchError(() =>
            of(
              SET_ALERT({
                alert: {
                  type: 'error',
                  message:
                    "Une erreur est survenue lors de la création de l'utilisateur !",
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
    private signUpService: SignupService
  ) {}
}
