import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewHoldingsComponent } from './view-holdings.component'
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component'
import { AuthGuard } from '../../core/guard/guard.guard'

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: ViewHoldingsComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewHoldingsRoutingModule { }
