import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DashboardServiceProxy } from '../../core/http/services2'
import { ModalService } from '../../core/services/modal.service'
import { ReportServiceProxy } from '../../core/http/services2'
import { ErrorPopupComponent } from '../../shared/components/error-popup/error-popup.component'
import {trigger, transition, animate, style, state, group} from '@angular/animations';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-trans-history',
  templateUrl: './trans-history.component.html',
  styleUrls: ['./trans-history.component.scss'],
  animations: [
    trigger('slideInOut', [
        state('in', style({height: '*', opacity: 0})),
        transition(':leave', [
            style({height: '*', opacity: 1}),

            group([
                animate(300, style({height: 0})),
                animate('200ms ease-in-out', style({'opacity': '0'}))
            ])

        ]),
        transition(':enter', [
            style({height: '0', opacity: 0}),

            group([
                animate(300, style({height: '*'})),
                animate('400ms ease-in-out', style({'opacity': '1'}))
            ])

        ])
    ])
]
})
export class TransHistoryComponent implements OnInit {
  displayedColumns: string[] = ['certNo', 'unit', 'transType', 'description', 'registrar', 'transDate',  ];
  totHistory: any = new MatTableDataSource([]);
  stageLoading: boolean = true
  pageNum = 1
  registrers: any = []
  company = 0
  transType = 2
  text = ""
  startDate = null
  endDate = null
  reportSeleceted = false
  fileName= 'coronation-transaction-report.xlsx';

  constructor(private modal: ModalService, private dash: DashboardServiceProxy, private report: ReportServiceProxy) {

  }

  ngOnInit(): void {
    this.fetchHistory()
    this.getReg()
  }

  search() {
    this.reportSeleceted = !this.reportSeleceted
  }
  onChangeDivT(event) {
    this.stageLoading = true
    this.report.fetchTransactionHistories(0, 2, "", null, null, 10, this.pageNum).subscribe(res => {
      this.stageLoading = false
      this.totHistory = res.result
    },(resErr) => {
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      this.stageLoading = false
    });
  }

  fetchHistory() {
    this.stageLoading = true
    this.report.fetchTransactionHistories(this.company, this.transType, this.text, this.startDate, this.endDate, 10, this.pageNum).subscribe(res => {
      this.stageLoading = false
      this.totHistory = new MatTableDataSource(res.result)
      this.reportSeleceted = false
    },(resErr) => {
      this.stageLoading = false
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
    });
  }

  getReg() {
    this.dash.getMyRegistrars().subscribe(res => {
      this.registrers = res.result
    },(resErr) => {
      // const data = {message: resErr, success: false}
      // this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      // console.log(resErr);
    });

  }

  next() {
    this.pageNum++
    this.fetchHistory()
  }
  prev() {
    if(this.pageNum <= 1) {
      return false
    }else {
      this.pageNum--
      this.fetchHistory()
    }
  }
  onChangeCom(event) {
    this.company = event
    console.log(this.company);

  }
  onChangeTran(event) {
    this.stageLoading = true
    this.report.fetchTransactionHistories(+event, 2, "", this.startDate, this.endDate, 100, this.pageNum).subscribe(res => {
      this.stageLoading = false
      this.totHistory = res.result    },(resErr) => {
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      this.stageLoading = false
    });
  }
  searchSale(mode) {
    this.stageLoading = true
    this.report.fetchTransactionHistories(+event, mode, "", this.startDate, this.endDate, 100, this.pageNum).subscribe(res => {
      this.stageLoading = false
      this.totHistory = res.result    },(resErr) => {
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      this.stageLoading = false
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.totHistory.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {

  }

  exportexcel(): void
    {
       /* table id is passed over here */
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);

    }

}
