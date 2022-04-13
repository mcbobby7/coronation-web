import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareholdingRoutingModule } from './shareholding-routing.module';
import { ShareholdingComponent } from './shareholding.component';
import { ModulesModule } from '../../shared/modules/modules.module'


@NgModule({
  declarations: [ShareholdingComponent],
  imports: [
    CommonModule,
    ShareholdingRoutingModule,
    ModulesModule
  ]
})
export class ShareholdingModule { }
