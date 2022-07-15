import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './auth.action';
import { SET_ALERT } from '../../alert/store/alert.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TRY_LOGIN_USER),
      mergeMap(({ type, ...user }) =>
        this.authService.signUp(user).pipe(
          switchMap((user) => [
            SET_ALERT({
              alert: {
                type: 'success',
                message: "L'utilisateur s'est connecté avec succès !",
                timeout: 5000,
              },
            }),
            actions.LOGIN_SUCCESS({ user }),
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

  constructor(private actions$: Actions, private authService: AuthService) {}
}
