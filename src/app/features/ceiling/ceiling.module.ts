import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './containers/listing/listing.component';
import { FormComponent } from './components/form/form.component';
import { CardComponent } from './components/card/card.component';
import { ceilingFeatures } from './store/ceiling.reducer';
import { CeilingEffects } from './store/ceiling.effects';
import { DeleteFormComponent } from './components/delete-form/delete-form.component';
import { SharedModule } from '../../shared/modules/shared.module';

const routes: Routes = [
  { path: '', component: ListingComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ListingComponent,
    FormComponent,
    CardComponent,
    DeleteFormComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(ceilingFeatures),
    EffectsModule.forFeature([CeilingEffects]),
    RouterModule.forChild(routes),
  ],
  exports: [ListingComponent],
})
export class CeilingModule {}
