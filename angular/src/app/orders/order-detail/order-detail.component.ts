import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import 'select2';
import { OrderDto } from '@shared/dto/order/order';
import { OrderServiceProxy } from '@shared/service-proxies/order-service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './order-detail.component.html',
  animations: [appModuleAnimation()]
})
export class OrderDetailComponent extends AppComponentBase implements OnInit {
  id: number;
  order= new OrderDto();
  currentDate: Date;
  taxPrice: number;
  total: number

  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
    this.currentDate = new Date();
  }
  ngOnInit() {
    this._orderService.get(this.id).subscribe((result: OrderDto) =>{
      this.order = result;
      this.taxPrice = result.totalPrice * 0.1;
      this.total = result.totalPrice + this.taxPrice;
    })
  }
}
