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
import { LoginPageComponent } from './login-page/login-page.component';
import { TransactionTypePageComponent } from './transaction-type-page/transaction-type-page.component';
import { AccountDebitSubmissionComponent } from './account-debit-submission/account-debit-submission.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EdbHeaderComponent,
    HomePageComponent,
    ClientsPageComponent,
    ClientDetailComponent,
    LoginPageComponent,
    TransactionTypePageComponent,
    AccountDebitSubmissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
