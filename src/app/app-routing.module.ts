import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './modules/dashboard/dashboard.component'
import { ConfirmEmailComponent } from './modules/confirm-email/confirm-email.component'
import { AuthGuard } from './core/guard/guard.guard'


const routes: Routes = [
  {
    path: '',
    component: ConfirmEmailComponent,
  },
  {
    path: '',
    loadChildren: () => import('../app/modules/settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: '',
    loadChildren: () => import('../app/modules/service-address/service-address.module').then(m => m.ServiceAddressModule),
  },
  {
    path: '',
    loadChildren: () => import('../app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'dividend',
    loadChildren: () => import('../app/modules/dividend/dividend.module').then(m => m.DividendModule),
  },
  {
    path: 'share-holdings',
    loadChildren: () => import('../app/modules/shareholding/shareholding.module').then(m => m.ShareholdingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'change-password',
    loadChildren: () => import('../app/modules/change-password/change-password.module').then(m => m.ChangePasswordModule),
  },
  {
    path: 'transaction-history',
    loadChildren: () => import('../app/modules/trans-history/trans-history.module').then(m => m.TransHistoryModule),
  },
  {
    path: 'view-holding',
    loadChildren: () => import('../app/modules/view-holdings/view-holdings.module').then(m => m.ViewHoldingsModule),
  },
  {
    path: 'dividend-history',
    loadChildren: () => import('../app/modules/div-history/div-history.module').then(m => m.DivHistoryModule),
  },
  {
    path: 'confirm-email/:uuid/:token',
    component: ConfirmEmailComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
