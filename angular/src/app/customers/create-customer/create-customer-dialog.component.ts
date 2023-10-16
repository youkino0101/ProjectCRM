import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
//dto
import { CustomerServiceProxy } from '@shared/service-proxies/customer-service';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateCustomerDto } from '@shared/dto/customer/customer-create';

@Component({
  templateUrl: 'create-customer-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class CreateCustomerDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customer = new CreateCustomerDto();
  @Input() selectListStatus: any;
  selectedValueStatus: string = 'Active';
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private _extensionService: ExtensionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getGenerateNumber()
  }

  save(): void {
    this.saving = true;

    this._customerService
      .create(this.customer)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        (error) => {
          abp.message.error(error, 'Error')
          this.saving = false;
        }
      );
  }

  private getGenerateNumber() {
    this._extensionService.getGenerateNumber('KH').subscribe(
      (success) => {
        this.customer.codeCustomer = success
      },
      (error) => {
        abp.message.error(error, 'Error')
      }
    );
  }

  onSelectionChange1() {
    this.customer.status = this.selectedValueStatus;
  }
}
