import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../delete-form/delete-form.component';
import { FormComponent } from '../form/form.component';
import { Ceiling } from '../../interfaces';
import { User } from '../../../../features/signup/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() ceiling!: Ceiling;
  @Input() user!: User | null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(data: number) {
    this.dialog.open(FormComponent, {
      width: '600px',
      data,
    });
  }

  openDeleteDialog(data: number) {
    this.dialog.open(DeleteFormComponent, {
      width: '600px',
      data,
    });
  }
}
