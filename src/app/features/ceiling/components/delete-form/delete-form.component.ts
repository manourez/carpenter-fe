import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TRY_DELETE_CEILING } from '../../store/ceiling.action';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.scss'],
})
export class DeleteFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private store: Store
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.store.dispatch(TRY_DELETE_CEILING({ id: this.data }));
  }

  onCancel() {
    this.dialogRef.close();
  }
}
