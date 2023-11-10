import { Component,OnInit, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { OrderServiceProxy } from '@shared/service-proxies/order-service';
import { OrdersDto } from '@shared/dto/order/orders';
import { OrderDtoPagedResultDto } from '@shared/dto/order/order-page';
import { OrderDetailComponent } from '@app/orders/order-detail/order-detail.component';
import * as moment from 'moment';
import { Dayjs } from 'dayjs';

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  fromDate: string;
  toDate: string;
}

@Component({
  templateUrl: './history-order.component.html',
  animations: [appModuleAnimation()]
})
export class HistoryOrderComponent extends PagedListingComponentBase<OrdersDto> implements OnInit {
  check = false;
  selected: any;
  alwaysShowCalendars: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  orders: OrdersDto[] = [];
  selectListOrderStatus: any[] = [];
  selectedValueOrder: string = '';
  keyword = '';
  fromDate = '';
  toDate = '';

  constructor(
    injector: Injector,
    private _ordersService: OrderServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
    this.alwaysShowCalendars = true;

  }

  list(
    request: PagedOrdersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    
    if (this.selected.startDate) {
      const startDateAsDate: Date = this.selected.startDate.toDate();
      const endDateAsDate: Date = this.selected.endDate.toDate();  
      this.fromDate = startDateAsDate.toDateString();
      this.toDate = endDateAsDate.toDateString();
    } else {
      this.fromDate = '';
      this.toDate = '';
    }
    request.fromDate = this.fromDate;
    request.toDate = this.toDate;
    this._ordersService
      .getAll(request.keyword, request.skipCount, request.maxResultCount, request.fromDate, request.toDate)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.orders = result.items;
        this.showPaging(result, pageNumber);
      });
      this.check = true;
  }

  delete(order: OrdersDto): void {
    
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
  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
}
