import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupService } from './service/signup.service';
import { SignupComponent } from './signup.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/signup.effects';
import { SharedModule } from '../../shared/modules/shared.module';
import { StoreModule } from '@ngrx/store';
import { signUpFeatures } from './store/signup.reducer';

const routes: Routes = [
  { path: '', component: SignupComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [SignupComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(signUpFeatures),
  ],
  providers: [SignupService],
})
export class SignupModule {}
