import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransHistoryRoutingModule } from './trans-history-routing.module';
import { TransHistoryComponent } from './trans-history.component';
import { ModulesModule } from '../../shared/modules/modules.module'


@NgModule({
  declarations: [TransHistoryComponent],
  imports: [
    CommonModule,
    TransHistoryRoutingModule,
    ModulesModule,
    FormsModule
  ]
})
export class TransHistoryModule { }
