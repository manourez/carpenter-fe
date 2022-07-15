import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CeilingModule } from './features/ceiling/ceiling.module';
import { AlertModule } from './features/alert/alert.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { SignupModule } from './features/signup/signup.module';
import { AuthModule } from './features/auth/auth.module';
import { AppbarComponent } from './features/appbar/appbar.component';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  declarations: [AppComponent, AppbarComponent],
  imports: [
    SharedModule,
    AppRoutingModule,
    SignupModule,
    AuthModule,
    AlertModule,
    BrowserModule,
    CeilingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
