import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EdbHeaderComponent } from './edb-header/edb-header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EdbHeaderComponent,
    HomePageComponent,
    ClientsPageComponent,
    ClientDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
