import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }
  reload() {

  }

}
