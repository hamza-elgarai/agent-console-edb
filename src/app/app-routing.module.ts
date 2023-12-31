import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TransactionTypePageComponent } from './transaction-type-page/transaction-type-page.component';
import { AccountDebitSubmissionComponent } from './account-debit-submission/account-debit-submission.component';
import { AuthGuard } from './guard/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { TransactionMgmtComponent } from './transaction-mgmt/transaction-mgmt.component';
import { CashSubmissionComponent } from './cash-submission/cash-submission.component';

const routes: Routes = [
  
  { path: '', component: HomePageComponent },
  { path: 'TransactionsType', component: TransactionTypePageComponent,canActivate: [AuthGuard] },
  {
    path: 'Account-Debit-Submissions',
    component: AccountDebitSubmissionComponent,canActivate: [AuthGuard]
  },
  {
    path: 'cash-submission',
    component: CashSubmissionComponent,canActivate: [AuthGuard]
  },
  { path: 'clients', component: ClientsPageComponent ,canActivate: [AuthGuard]},
  { path: 'client/:id', component: ClientDetailComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginPageComponent },
  { path: 'manage-transaction', component: TransactionMgmtComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes),HttpClientModule],
})
export class AppRoutingModule {}
