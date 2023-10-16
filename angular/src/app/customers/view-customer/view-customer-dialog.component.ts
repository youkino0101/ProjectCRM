import {
  Component,
  Injector,
  OnInit,
  Input
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerDto } from '@shared/dto/customer/customer';
import { CustomerServiceProxy } from '@shared/service-proxies/customer-service';

@Component({
  templateUrl: 'view-customer-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class ViewCustomerDialogComponent extends AppComponentBase
  implements OnInit {
  id: number;
  customer = new CustomerDto();
  @Input() selectListStatus: any;
  selectedValueStatus: string;

  constructor(
    injector: Injector,
    private _customersService: CustomerServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._customersService
      .get(this.id)
      .subscribe((result: CustomerDto) => {
        this.customer = result;
        this.selectedValueStatus = result.statusName;
      });
  }
}
