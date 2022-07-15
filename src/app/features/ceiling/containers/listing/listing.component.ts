import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormComponent } from '../../components/form/form.component';
import { Ceiling, CeilingPerf } from '../../interfaces';
import {
  TRY_FETCH_CEILINGS,
  TRY_FETCH_PERFORMANCES,
} from '../../store/ceiling.action';
import {
  selectCeilings,
  selectPerformances,
} from '../../store/ceiling.reducer';
import { User } from '../../../signup/interfaces';
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  user!: User | null;
  ceilings!: Observable<Ceiling[]>;
  performances!: Observable<CeilingPerf[]>;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService
  ) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  ngOnInit(): void {
    this.store.dispatch(TRY_FETCH_CEILINGS());
    this.store.dispatch(TRY_FETCH_PERFORMANCES());
    this.ceilings = this.store.select(selectCeilings);
    this.performances = this.store.select(selectPerformances);

    if (this.user) {
      this.commonService.changeData(true);
    }
  }

  openFormDialog(data = 0): void {
    this.dialog.open(FormComponent, {
      width: '600px',
      data,
    });
  }
}
