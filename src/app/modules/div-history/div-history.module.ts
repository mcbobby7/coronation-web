import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DivHistoryRoutingModule } from './div-history-routing.module';
import { DivHistoryComponent } from './div-history.component';
import { ModulesModule } from '../../shared/modules/modules.module'



@NgModule({
  declarations: [DivHistoryComponent],
  imports: [
    CommonModule,
    DivHistoryRoutingModule,
    ModulesModule,
    FormsModule
  ]
})
export class DivHistoryModule { }
