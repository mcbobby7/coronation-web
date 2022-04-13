import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ChangeAddressComponent } from '../../modules/change-address/change-address.component'
import { ModalService } from '../../core/services/modal.service'
import { ServiceRequestServiceProxy } from '../../core/http/services2'
import { ErrorPopupComponent } from '../../shared/components/error-popup/error-popup.component'



export interface UserData {
  id: number;
  company_name: string;
  new_Address: string;
  requestTypeName: string;
  approvalStatusName: string;
  dateCreated: string;
}

/** Constants used to fill up our data base. */

@Component({
  selector: 'app-service-address',
  templateUrl: './service-address.component.html',
  styleUrls: ['./service-address.component.scss']
})
export class ServiceAddressComponent implements OnInit {

  pageNum = 1
  stageLoading: boolean = true;
  list = []
  selection = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'id', 'company_name', 'new_Address', 'requestTypeName', 'approvalStatusName', 'dateCreated'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private modal: ModalService, private service: ServiceRequestServiceProxy) {
    // Create 100 users
    const list = this.list;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(list);
  }


  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.stageLoading = true
    this.service.fetchAddressChangeRequests(+localStorage.getItem("companyId"), null, "", null, null, 100, this.pageNum).subscribe(res => {
      this.stageLoading = false
      this.list = res.result
      this.dataSource = new MatTableDataSource(this.list);
      console.log(res.result);
    },(resErr) => {
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      console.log(resErr);
  });
  }

  address() {
    this.modal.openModal(ChangeAddressComponent)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
