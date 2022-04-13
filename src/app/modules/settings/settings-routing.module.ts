import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component'
import { SettingsComponent } from './settings.component'

const routes: Routes = [
  {
    path: 'Settings',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: SettingsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
