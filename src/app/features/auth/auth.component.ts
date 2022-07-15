import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LOGOUT, TRY_LOGIN_USER } from './store/auth.action';
import { selectUser } from './store/auth.reducer';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.subscription.add(
      this.store.select(selectUser).subscribe((user) => {
        if (user) {
          this.router.navigate(['/ceilings'], { state: { user } });
        } else {
          this.router.navigate(['/login']);
        }
      })
    );

    this.subscription.add(
      this.commonService.logout$.subscribe((res) => {
        if (res) {
          this.store.dispatch(LOGOUT());
        }
      })
    );
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.store.dispatch(TRY_LOGIN_USER(this.form.value));
  }

  onCancel() {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
