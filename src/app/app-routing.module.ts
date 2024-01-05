import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { TransactionTypePageComponent } from './transaction-type-page/transaction-type-page.component';
import { AccountDebitSubmissionComponent } from './account-debit-submission/account-debit-submission.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'TransactionsType', component: TransactionTypePageComponent },
  {
    path: 'Account-Debit-Submissions',
    component: AccountDebitSubmissionComponent,
  },
  { path: 'clients', component: ClientsPageComponent },
  { path: 'client/:id', component: ClientDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
