import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
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
  selector: 'app-div-history',
  templateUrl: './div-history.component.html',
  styleUrls: ['./div-history.component.scss'],
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
export class DivHistoryComponent implements OnInit {

  displayedColumns: string[] = ['warrantNo', 'paymentNo', 'registrar', 'netAmount', 'holdings', 'gross', 'tax',  'datePaid',];
  totHistory: any = new MatTableDataSource([])
  stageLoading: boolean = true
  pageNum = 1
  registrers: any = []
  company = 0
  transType = 2
  text = ""
  startDate = null
  endDate = null
  reportSeleceted = false
  fileName= 'coronation-dividend-report.xlsx';

  constructor(private modal: ModalService, private dash: DashboardServiceProxy, private report: ReportServiceProxy) {}

  ngOnInit(): void {
    this.fetchHistory()
    this.getReg()
  }
  search() {
    this.reportSeleceted = !this.reportSeleceted
  }

  onChangeCom(event) {
    this.company = event
    console.log(this.company);

  }

  fetchHistory() {
    this.stageLoading = true
    this.report.fetchDividendHistories(this.company, this.text, this.startDate, this.endDate, 10, this.pageNum).subscribe(res => {
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

  onChangeDivT(event) {
    this.stageLoading = true
    this.report.fetchDividendHistories(+event, "", null, null, 10, this.pageNum).subscribe(res => {
      this.stageLoading = false
      this.totHistory = res.result
    },(resErr) => {
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
