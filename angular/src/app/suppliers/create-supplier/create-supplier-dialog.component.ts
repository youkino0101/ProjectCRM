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
import { SupplierServiceProxy } from '@shared/service-proxies/supplier-service';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateSupplierDto } from '@shared/dto/supplier/supplier-create';

@Component({
  templateUrl: 'create-supplier-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class CreateSupplierDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  supplier = new CreateSupplierDto();
  @Input() selectListStatus: any;
  selectedValueStatus: string = 'Active';
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _supplierService: SupplierServiceProxy,
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

    this._supplierService
      .create(this.supplier)
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
    this._extensionService.getGenerateNumber('SUP').subscribe(
      (success) => {
        this.supplier.supplierCode = success
      },
      (error) => {
        abp.message.error(error, 'Error')
      }
    );
  }

  onSelectionChange1() {
    this.supplier.status = this.selectedValueStatus;
  }
}
