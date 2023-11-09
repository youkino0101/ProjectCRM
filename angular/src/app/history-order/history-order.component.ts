import { Component, Injector } from '@angular/core';
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

class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  fromDate: string;
  toDate: string;
}

@Component({
  templateUrl: './history-order.component.html',
  animations: [appModuleAnimation()]
})
export class HistoryOrderComponent extends PagedListingComponentBase<OrdersDto> {
  orders: OrdersDto[] = [];
  
  keyword = '';
  fromDate = '';
  toDate = '';

  constructor(
    injector: Injector,
    private _ordersService: OrderServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
    
  }

  list(
    request: PagedOrdersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
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
}
