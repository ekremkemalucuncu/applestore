import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { OffersComponent } from './offers/offers.component';
import { ProductComponent } from './products/product/product.component';
import { ProducteditComponent } from './products/productmanager/productedit/productedit.component';
import { ProductmanagerComponent } from './products/productmanager/productmanager.component';



const redirectUnauthorizedToAuthentication = () => redirectUnauthorizedTo(['authentication']);

const routes: Routes = [
  {
    path:'authentication', 
    component:AuthenticationComponent
  },
  {path:'product',component:ProductComponent},
  {
    path:'productmanager',
    component:ProductmanagerComponent,
    canActivate:[AngularFireAuthGuard] ,
    data:{authGuardPipe:redirectUnauthorizedToAuthentication},
  },
  {
    path:'productmanager/add',component:ProducteditComponent
  },
  {
    path:'productmanager/update',component:ProducteditComponent
  },
  {
    path:'offers',component:OffersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
