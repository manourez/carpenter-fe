import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  displayMessage(type: 'error' | 'success', message: string, timeout = 5000) {
    this.snackBar.open(message, 'Fermer', {
      duration: timeout,
      panelClass: [type + '-snackbar'],
    });
  }
}
