import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerDto } from '@shared/dto/customer/customer';
import { CustomerServiceProxy } from '@shared/service-proxies/customer-service';

@Component({
  templateUrl: 'edit-customer-dialog.component.html'
})
export class EditCustomerDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  customer = new CustomerDto();
  selectedValueCate: string;
  selectedValueStatus: string;
  @Input() selectListStatus: any;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._customerService
      .get(this.id)
      .subscribe((result: CustomerDto) => {
        this.customer = result;
        this.selectedValueStatus = result.statusName;
      });
  }

  save(): void {
    this.saving = true;
    this.customer.status = this.selectedValueStatus
    
    this._customerService.update(this.customer).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

}
