import { Component, OnInit } from '@angular/core';
import {trigger, style, animate, transition, state} from '@angular/animations';
import { MegaModalService } from '../../../core/services/mega-modal.service'

@Component({
  selector: 'app-mega-modal',
  templateUrl: './mega-modal.component.html',
  styleUrls: ['./mega-modal.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class MegaModalComponent implements OnInit {

  constructor( private modal: MegaModalService) { }

  ngOnInit(): void {
    // this.vissible = this.modal.isVisible()
  }

  close() {
    this.modal.closeModal()
  }

}
