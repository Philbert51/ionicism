import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionhistoryPage } from './transactionhistory.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionhistoryPage
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionhistoryPageRoutingModule {}
