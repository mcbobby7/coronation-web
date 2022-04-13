import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividendRoutingModule } from './dividend-routing.module';
import { DividendComponent } from './dividend.component';


@NgModule({
  declarations: [DividendComponent],
  imports: [
    CommonModule,
    DividendRoutingModule
  ]
})
export class DividendModule { }
