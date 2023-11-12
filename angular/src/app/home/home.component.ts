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
import { Subject, finalize } from 'rxjs';
import { DashboardDto } from '@shared/dto/chart/dashboardDto'
import { OrderServiceProxy } from '@shared/service-proxies/order-service';
import { OrderDtoPagedResultDto } from '@shared/dto/order/order-page';
import { OrdersDto } from '@shared/dto/order/orders';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderDetailComponent } from '@app/orders/order-detail/order-detail.component';

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
export class HomeComponent extends AppComponentBase {
  chartAxe: ChartAxeDto[] = [];
  totalAmountData: any;
  dashboardDto = new DashboardDto();
  orderCountData: any;
  monthData: any;
  dateArray: string[] = [];
  monthNames: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  orders: OrdersDto[] = [];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private dataReadySubject = new Subject<void>();
  constructor(
    injector: Injector,
    private _extensionService: ExtensionServiceProxy,
    private _ordersService: OrderServiceProxy,
    private _modalService: BsModalService)
 {
    super(injector);
    this._extensionService.getChartAxeOrder().subscribe((success) => {
      this.chartAxe = success.items;
      this.dataReadySubject.next();
    });
    this.dataReadySubject.subscribe(() => {
      this.setupChart();
    });
    this._extensionService.getInfomationOrderOfDashBoard().subscribe((success) => {
      this.dashboardDto = success;
    });
    this.generateMonthArray();
    this._ordersService
      .getAll('', 0, 3, '', '', '')
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
      });
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
          name: this.l("SalesProceeds"),
          type: "column",
          data: this.totalAmountData
        },
        {
          name: this.l("TotalOrder"),
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
        text: this.l("SalesStatistics")
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
            text: this.l("SalesProceeds")
          }
        },
        {
          opposite: true,
          title: {
            text: this.l("TotalOrder")
          }
        }
      ]
    };
  }

  viewOrder(order?: OrdersDto): void {
    let viewModalDialog: BsModalRef;
    if (order.id) {
      viewModalDialog = this._modalService.show(

        OrderDetailComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: order.id,
          },
        }
      );
    }
  }
}
