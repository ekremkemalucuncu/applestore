import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MaterialModule } from './material.module';
import { ProductsComponent } from './products/products.component';
import { ProductmanagerComponent } from './products/productmanager/productmanager.component';
import { ProductComponent } from './products/product/product.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from "@angular/fire/compat/firestore"
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from './app.reducer';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { ProducteditComponent } from './products/productmanager/productedit/productedit.component';
import { EffectsModule } from '@ngrx/effects';
import { PhonesEffects } from './shared/reducers/phones/phones.effects';
import { AuthenticationEffects } from './shared/reducers/auth.effects';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ProductsComponent,
    HeaderComponent,
    ProductsComponent,
    ProductmanagerComponent,
    ProductComponent,
    ProducteditComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PhonesEffects, AuthenticationEffects])
  ],
  providers: [
    {
      provide: PERSISTENCE, useValue: 'local'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
