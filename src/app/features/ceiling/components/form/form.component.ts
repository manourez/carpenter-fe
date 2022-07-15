import { Subscription, take } from 'rxjs';
import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Ceiling, CeilingPerf, CreateCeiling } from '../../interfaces';
import {
  TRY_ADD_CEILING,
  TRY_FETCH_CEILING,
  TRY_FETCH_PERFORMANCES,
  TRY_UPDATE_CEILING,
} from '../../store/ceiling.action';
import { selectCeiling, selectPerformances } from '../../store/ceiling.reducer';
import { selectAlert } from '../../../alert/store/alert.reducer';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  form!: FormGroup;
  editMode: boolean = false;
  ceiling!: Ceiling;
  perfs!: CeilingPerf[];
  oncloseDialog = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TRY_FETCH_PERFORMANCES());

    if (this.data !== 0) {
      this.editMode = true;
      this.store.dispatch(TRY_FETCH_CEILING({ id: this.data }));
    }

    this.subscription.add(
      this.store.select(selectCeiling).subscribe((res) => {
        this.ceiling = res;
        this.initForm();

        this.subscription.add(
          this.store
            .select(selectPerformances)
            .pipe(take(1))
            .subscribe((performances) => {
              this.perfs = performances;
              this.addPerformances();
            })
        );
      })
    );

    this.oncloseDialog.subscribe(() => {
      this.subscription.add(
        this.store.select(selectAlert).subscribe((alert) => {
          if (alert && alert.type === 'success') {
            this.dialogRef.close();
          }
        })
      );
    });
  }

  get performances() {
    return this.form.get('performances') as FormArray;
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [this.editMode ? this.ceiling.name : '', Validators.required],
      imageUrl: [
        this.editMode ? this.ceiling.imageUrl : '',
        Validators.required,
      ],
      reference: [
        this.editMode ? this.ceiling.reference : '',
        Validators.required,
      ],
      performances: this.formBuilder.array([]),
      price: [this.editMode ? this.ceiling.price : '', Validators.required],
      width: [this.editMode ? this.ceiling.width : '', Validators.required],
      height: [this.editMode ? this.ceiling.height : '', Validators.required],
    });
  }

  addPerformances() {
    const performancesChecked = this.editMode ? this.ceiling.performces : [];

    this.perfs.forEach((performance) => {
      const value = performancesChecked?.some((p) => p.id === performance.id);
      this.performances.push(this.formBuilder.control(value));
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    const { performances, ...otherValue } = this.form.value;
    let perfs: number[] = [];

    performances.forEach((perf: boolean, index: number) => {
      if (perf) {
        perfs.push(this.perfs[index].id);
      }
    });

    const listOfPerformances = perfs.join(';');
    const ceiling: CreateCeiling = { perfs: listOfPerformances, ...otherValue };

    if (this.editMode) {
      this.store.dispatch(TRY_UPDATE_CEILING({ id: this.data, ceiling }));
    } else {
      this.store.dispatch(TRY_ADD_CEILING({ ceiling }));
    }
  }

  onCloseDialog() {
    this.oncloseDialog.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
