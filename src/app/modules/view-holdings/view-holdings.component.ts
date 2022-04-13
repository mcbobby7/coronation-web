import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ReportServiceProxy } from '../../core/http/services2'
import { ModalService } from '../../core/services/modal.service'
import { ErrorPopupComponent } from '../../shared/components/error-popup/error-popup.component'

@Component({
  selector: 'app-view-holdings',
  templateUrl: './view-holdings.component.html',
  styleUrls: ['./view-holdings.component.scss']
})
export class ViewHoldingsComponent implements OnInit {

  displayedColumns: string[] = ['shareholderName', 'companyName', 'unit', 'claimed', 'claimedDate'];
  totHistory: any = new MatTableDataSource([]);
  stageLoading: boolean = true
  pageNum = 1

  constructor(private modal: ModalService, private report: ReportServiceProxy) {

  }


  ngOnInit(): void {
    this.fetchHistory()
  }

  fetchHistory() {
    this.report.fetchViewHoldings(+localStorage.getItem("companyId"), null, "", null, null, 100, this.pageNum).subscribe(res => {
      this.stageLoading = false
      this.totHistory = new MatTableDataSource(res.result)
      console.log(res);

    },(resErr) => {
      this.stageLoading = false
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.totHistory.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {

  }

}
