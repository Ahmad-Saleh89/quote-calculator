import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CurrentSpecialComponent } from './current-special/current-special.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, HeaderComponent, HomeComponent, CurrentSpecialComponent, PageNotFoundComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
