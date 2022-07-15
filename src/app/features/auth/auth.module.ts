import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthComponent } from './auth.component';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthEffects } from './store/auth.effects';
import { authFeatures } from './store/auth.reducer';

const routes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(authFeatures),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
