import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component'
import { TransHistoryComponent } from './trans-history.component'
import { AuthGuard } from '../../core/guard/guard.guard'
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: TransHistoryComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransHistoryRoutingModule { }
