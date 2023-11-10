import { Component, Injector, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';
import { ChartAxeDto } from '@shared/dto/chart/chartAxe';
import { ListChartAxe } from '@shared/dto/chart/listResultChartAxe';
import { Subject } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase{
  chartAxe: ChartAxeDto[] = [];
  totalAmountData: any;
  orderCountData: any;
  monthData: any;
  dateArray: string[] = [];
  monthNames: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private dataReadySubject = new Subject<void>();
  constructor(
    injector: Injector,
    private _extensionService: ExtensionServiceProxy)
 {
    super(injector);
    this._extensionService.getChartAxeOrder().subscribe((success) => {
      this.chartAxe = success.items;
      console.log(this.chartAxe);
      this.dataReadySubject.next(); // Thông báo rằng dữ liệu đã sẵn sàng
    });
  
    this.dataReadySubject.subscribe(() => {
      this.setupChart();
    });
    this.generateMonthArray();
  }

  generateMonthArray() {
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const month = this.monthNames[currentDate.getMonth()];
      const year = currentDate.getFullYear().toString();
      const formattedDate = `${month} ${year}`;
      this.dateArray.push(formattedDate);

      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    this.dateArray.reverse();
  }

  private setupChart() {
    this.totalAmountData = this.chartAxe.map((item) => item.totalAmount);
    this.orderCountData = this.chartAxe.map((item) => item.orderCount);
    this.monthData = this.chartAxe.map((item) => item.month);
    this.chartOptions = {
      series: [
        {
          name: "Tiền Bán Hàng",
          type: "column",
          data: this.totalAmountData
        },
        {
          name: "Số đơn Hàng",
          type: "line",
          data: this.orderCountData
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Thống kế mua hàng"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: this.dateArray,
      xaxis: {
        type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Website Blog"
          }
        },
        {
          opposite: true,
          title: {
            text: "Social Media"
          }
        }
      ]
    };
  }
}
