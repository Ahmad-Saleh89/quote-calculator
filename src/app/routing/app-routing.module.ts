import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegularPriceComponent } from '../regular-price/regular-price.component';
import { CurrentSpecialComponent } from '../current-special/current-special.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: RegularPriceComponent },
  { path: 'special', component: CurrentSpecialComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}