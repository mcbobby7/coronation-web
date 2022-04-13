import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewHoldingsRoutingModule } from './view-holdings-routing.module';
import { ViewHoldingsComponent } from './view-holdings.component';
import { ModulesModule } from '../../shared/modules/modules.module'


@NgModule({
  declarations: [ViewHoldingsComponent],
  imports: [
    CommonModule,
    ViewHoldingsRoutingModule,
    ModulesModule
  ]
})
export class ViewHoldingsModule { }
