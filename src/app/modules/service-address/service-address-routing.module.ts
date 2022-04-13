import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component'
import { ServiceAddressComponent } from './service-address.component'
import { AuthGuard } from '../../core/guard/guard.guard'

const routes: Routes = [
  {
    path: 'service-request',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: ServiceAddressComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceAddressRoutingModule { }
