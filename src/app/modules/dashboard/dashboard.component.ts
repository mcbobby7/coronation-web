import { Component, OnInit, ViewChild  } from '@angular/core';
import { DashboardServiceProxy } from '../../core/http/services2'
import { ModalService } from '../../core/services/modal.service'
import { MegaModalService } from '../../core/services/mega-modal.service'
import { ErrorPopupComponent } from '../../shared/components/error-popup/error-popup.component'
import { ChartDataSets, ChartOptions, ChartType  } from 'chart.js';
import { MultiDataSet, Color, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { SubscribeComponent } from '../../shared/components/subscribe/subscribe.component'
import { ViewAllGraphComponent } from '../../shared/components/view-all-graph/view-all-graph.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['paymentNo', 'dividend', 'dividendStatus'];
  displayedColumns1: string[] = ['unitOfShares', 'description', 'dividendStatus', 'dateCreated'];
  overlay = 'rgba(0, 0, 0, 0.18)';
  backgroundImg = "assets/images/ad1.png"
  stageLoading: boolean = true
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
  registrers: any = [];
  dividend: any = []

  doughnutChartLabels: Label[] = ['Dangote'];
  doughnutChartData: MultiDataSet = [
    [100,]
  ];
  doughnutChartType: ChartType = 'pie';


  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'Dangote' },
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

  dChartColors: Color[] = [
    {
      borderColor: '#59CBE8',
      backgroundColor: '#59CBE8',
    },
    {
      borderColor: '#B580D1',
      backgroundColor: '#B580D1',
    },
    {
      borderColor: '#59CBE8',
      backgroundColor: '#59CBE8',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';

  constructor(private dash: DashboardServiceProxy, private modal: ModalService, private router: Router, private mega: MegaModalService) { }

  ngOnInit(): void {
    this.getData()
  }

  divHisto() {
    if(this.tire == "1") {
      this.modal.openModal(SubscribeComponent)
    }else {
      this.router.navigateByUrl('/dividend-history');
    }
  }
  transHisto() {
    if(this.tire == "1") {
      this.modal.openModal(SubscribeComponent)
    }else {
      this.router.navigateByUrl('/transaction-history');
    }
  }
  viewAll() {
    let data = {lineChartData: this.lineChartData, lineChartLabels: this.lineChartLabels}
    this.mega.openModal(ViewAllGraphComponent, 'modal', data)
  }

  searchSale(mode) {
    this.stageLoading = true
    this.dash.fetchTransactionHistories(+localStorage.getItem("companyId"), +mode).subscribe(res => {
      this.stageLoading = false
      this.totHistory = res.result    },(resErr) => {
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      this.stageLoading = false
    });
  }

  searchComp(mode) {

  }
  onChangeDiv(event) {
    this.stageLoading = true
    this.dash.fetchShareHolderDashboard(+event).subscribe(res => {
      this.stageLoading = false
      this.list = res.result
    },(resErr) => {
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      this.stageLoading = false
    });
  }
  onChangeTran(event) {
    this.stageLoading = true
    this.dash.fetchTransactionHistories(+event, 0).subscribe(res => {
      this.stageLoading = false
      this.totHistory = res.result    },(resErr) => {
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      this.stageLoading = false
    });
  }

  onChangeDivT(event) {
    this.stageLoading = true
    this.dash.fetchDividendHistories(+event, null, null).subscribe(res => {
      this.stageLoading = false
      this.divHistory = res.result
    },(resErr) => {
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      this.stageLoading = false
    });
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
          this.doughnutChartData[0].splice(dan, 1, this.holdHistory[i].value)
          this.doughnutChartData = [...this.doughnutChartData]
          glo++
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

  getData() {
    this.stageLoading = true
    this.dash.fetchShareHolderDashboard(+localStorage.getItem("companyId")).subscribe(res => {
      this.list = res.result
    },(resErr) => {
      // const data = {message: resErr, success: false}
      // this.modal.openModal(ErrorPopupComponent, 'modal', data,)
    });

    this.dash.fetchShareHoldingViews().subscribe(res => {
      this.holdHistory = res.result
      console.log(res);
      this.doughnutChartLabels = []

      let dan = 0
      let glo = 0
      for(let i = 0; i < this.holdHistory.length; i++){
        this.doughnutChartLabels.push(this.holdHistory[i].name)
          this.doughnutChartData[0].splice(dan, 1, this.holdHistory[i].value)
          this.doughnutChartData = [...this.doughnutChartData]
          glo++
      }
    },(resErr) => {
      // const data = {message: resErr, success: false}
      // this.modal.openModal(ErrorPopupComponent, 'modal', data,)
    });


    this.dash.fetchDividendHistories(+localStorage.getItem("companyId"), null, null).subscribe(res => {
      this.divHistory = res.result
    },(resErr) => {
      // const data = {message: resErr, success: false}
      // this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      // console.log(resErr);
    });
    this.dash.getMyRegistrars().subscribe(res => {
      this.registrers = res.result
    },(resErr) => {
      // const data = {message: resErr, success: false}
      // this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      // console.log(resErr);
    });

    this.dash.fetchTransactionHistories(0, 0).subscribe(res => {
      this.totHistory = res.result    },(resErr) => {
      // const data = {message: resErr, success: false}
      // this.modal.openModal(ErrorPopupComponent, 'modal', data,)
    });
    this.dash.fetchShareHolderDividends().subscribe(res => {
      let result = res.result
      if(result[0]) {
        this.dividend.push(result[0])
      }
      if(result[1]) {
        this.dividend.push(result[1])
      }
      if(result[2]) {
        this.dividend.push(result[2])
      }
        console.log(this.dividend);

       },(resErr) => {
      // const data = {message: resErr, success: false}
      // this.modal.openModal(ErrorPopupComponent, 'modal', data,)
    });

    this.dash.fetchTotalValuations().subscribe(res => {
      this.stageLoading = false
      this.valuation = res.result
      console.log(this.valuation);
      let glo = 0
      for(let i = 0; i < this.holdHistory.length; i++){
        this.lineChartLabels.push(this.holdHistory[i].name)
          this.lineChartData[0].data.splice(glo, 1, this.holdHistory[i].value)
          this.lineChartData = [...this.lineChartData]
          this.lineChartData[0].label = this.holdHistory[i].name
          glo++
          console.log(this.valuation);

      }

    },(resErr) => {
      this.stageLoading = false
      const data = {message: resErr, success: false}
      this.modal.openModal(ErrorPopupComponent, 'modal', data,)
    });

  }

}
