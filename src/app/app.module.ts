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
<<<<<<< HEAD
import { TextSlice } from './shared/pipes/textslicer.pipe';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './shared/store/products/products.effects';
import { AuthenticationEffects } from './shared/store/auth/auth.effects';

=======
import { TextSlice } from './shared/pipes/pipe';
import { FormCreation } from './core/services/formcreation.service';
import { EffectsModule } from '@ngrx/effects';
import { PhonesEffects } from './shared/reducers/phones/phones.effects';
>>>>>>> 544149201b588bfffcf8d6ee14362ecc25c4a210

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
    TextSlice,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
<<<<<<< HEAD
    EffectsModule.forRoot([ProductEffects,AuthenticationEffects]),
=======
    EffectsModule.forRoot([PhonesEffects])
>>>>>>> 544149201b588bfffcf8d6ee14362ecc25c4a210
  ],
  providers: [
    {
      provide: PERSISTENCE, useValue: 'local'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
