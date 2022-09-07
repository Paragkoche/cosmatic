import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BagComponent } from './page/bag/bag.component';
import { CatalogComponent } from './page/catalog/catalog.component';
import { LandingComponent } from './page/landing/landing.component';
import { LoginComponent } from './page/login/login.component';
import { ProductInfoComponent } from './page/product-info/product-info.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingComponent,
  },
  {
    path: 'product/:id',
    component: ProductInfoComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-in',
    component: SignUpComponent,
  },
  {
    path: 'bag',
    component: BagComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
