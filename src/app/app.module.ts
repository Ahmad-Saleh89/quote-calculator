import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CurrentSpecialComponent } from './current-special/current-special.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegularPriceComponent } from './regular-price/regular-price.component';
import { PaymentPlanComponent } from './home/payment-plan/payment-plan.component';
import { OptionPanelComponent } from './regular-price/option-panel/option-panel.component';
import { CoursesService } from './services/courses.service';
import { SpecialsService } from './services/specials.service';
import { SpecialPanelComponent } from './current-special/special-panel/special-panel.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, NgbModule, HttpClientModule ],
  declarations: [ AppComponent, HeaderComponent, HomeComponent, CurrentSpecialComponent, PageNotFoundComponent, RegularPriceComponent, PaymentPlanComponent, OptionPanelComponent, SpecialPanelComponent, FooterComponent, AuthComponent, SpinnerComponent ],
  bootstrap:    [ AppComponent ],
  providers: [CoursesService, SpecialsService, AuthService]
})
export class AppModule { }
