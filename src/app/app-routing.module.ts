import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ceilings', pathMatch: 'full' },
  {
    path: 'ceilings',
    loadChildren: () =>
      import('./features/ceiling/ceiling.module').then((m) => m.CeilingModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/signup/signup.module').then((m) => m.SignupModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
