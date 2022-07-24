import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AccessoirComponent } from './products/accessoir/accessoir.component';
import { IphoneComponent } from './products/iphone/iphone.component';
import { AccessoirmanagerComponent } from './productsmanager/accessoirmanager/accessoirmanager.component';
import { IphonemanagerComponent } from './productsmanager/iphonemanager/iphonemanager.component';



const redirectUnauthorizedToAuthentication = () => redirectUnauthorizedTo(['authentication']);

const routes: Routes = [
  {
    path:'authentication', 
    component:AuthenticationComponent
  },
  {path:'iphone',component:IphoneComponent},
  {path:'accessoir',component:AccessoirComponent},
  {
    path:'iphonemanager',
    component:IphonemanagerComponent,
    canActivate:[AngularFireAuthGuard] ,
    data:{authGuardPipe:redirectUnauthorizedToAuthentication}
  },
  {
    path:'accessoirmanager',
    component:AccessoirmanagerComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectUnauthorizedToAuthentication}
  },
  {
    path:'object/',
    component:AccessoirmanagerComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectUnauthorizedToAuthentication}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
