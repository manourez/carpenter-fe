import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertService } from './features/alert/services/alert.service';
import { CLEAR_ALERT } from './features/alert/store/alert.actions';
import { Alert, selectAlert } from './features/alert/store/alert.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  title = 'carpenter-fe';

  constructor(private alertService: AlertService, private store: Store) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectAlert).subscribe((alert) => {
        this.displayAlert(alert);
      })
    );
  }

  displayAlert(alert: Alert | null) {
    if (alert && !Array.isArray(alert.message)) {
      this.alertService.displayMessage(
        alert.type,
        alert.message,
        alert.timeout
      );
      this.store.dispatch(CLEAR_ALERT());
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
