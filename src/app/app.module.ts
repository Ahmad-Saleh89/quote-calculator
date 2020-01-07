import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CurrentSpecialComponent } from './current-special/current-special.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegularPriceComponent } from './regular-price/regular-price.component';
import { PaymentPlanComponent } from './home/payment-plan/payment-plan.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, NgbModule ],
  declarations: [ AppComponent, HeaderComponent, HomeComponent, CurrentSpecialComponent, PageNotFoundComponent, RegularPriceComponent, PaymentPlanComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
