import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { DashboardServiceProxy } from '../../../core/http/services2'
import { ModalService } from '../../../core/services/modal.service'
import { ErrorPopupComponent } from '../error-popup/error-popup.component'


@Component({
  selector: 'app-view-all-graph',
  templateUrl: './view-all-graph.component.html',
  styleUrls: ['./view-all-graph.component.scss']
})
export class ViewAllGraphComponent implements OnInit {
  @Input() data;
  stageLoading: boolean = false
  list: any = []
  views: any = []
  holdHistory: any = []
  totHistory: any = []
  divHistory: any = []
  valuation: any = []
  date = new Date()
  divMode = "1W"
  days: number;
  tire = localStorage.getItem('tire')

  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'Dangote' },
    { data: [0, 0, 0, 0, 0], label: 'GlobalCom' },
  ];

  lineChartLabels: Label[] = [];


  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#B580D1',
      backgroundColor: '#b580d15b',
    },
    {
      borderColor: '#59CBE8',
      backgroundColor: '#59cbe844',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private router: Router, private dash: DashboardServiceProxy, private modal: ModalService) { }

  ngOnInit(): void {
    this.lineChartData = this.data.lineChartData
    this.lineChartLabels = this.data.lineChartLabels
  }

  searchdiv(days, mode) {
    this.divMode = mode
    this.days = days
    this.stageLoading = true
    this.dash.fetchShareHoldingViews().subscribe(res => {
      this.stageLoading = false
      if(!res.hasError){
        this.lineChartData = [
          { data: [0, 0, 0, 0, 0], label: 'Dangote' },
          { data: [0, 0, 0, 0, 0], label: 'GlobalCom' },
        ]
        this.lineChartLabels = []
        this.holdHistory = res.result
      let dan = 0
      let glo = 0
      for(let i = 0; i < this.holdHistory.length; i++){
        this.lineChartLabels.push(this.holdHistory[i].name)
        if(this.holdHistory[i].category == "Dangote") {
          this.lineChartData[0].data.splice(dan, 1, this.holdHistory[i].value)
          this.lineChartData = [...this.lineChartData]
          glo++
        }else {
          this.lineChartData[1].data.splice(glo, 1, this.holdHistory[i].value)
          this.lineChartData = [...this.lineChartData]
          dan++
        }
      }
      }else {
      const data = {message: "Error: sorry something went wrong", success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      }
    },(resErr) => {
      this.stageLoading = false
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
    });
  }

}
