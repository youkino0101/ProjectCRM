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
import { EditSupplierDto } from '@shared/dto/supplier/supplier-edit';
import { SupplierDto } from '@shared/dto/supplier/supplier';
import { SupplierServiceProxy } from '@shared/service-proxies/supplier-service';

@Component({
  templateUrl: 'edit-supplier-dialog.component.html'
})
export class EditSupplierDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  supplier = new SupplierDto();
  selectedValueCate: string;
  selectedValueStatus: string;
  @Input() selectListStatus: any;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _supplierService: SupplierServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._supplierService
      .get(this.id)
      .subscribe((result: SupplierDto) => {
        this.supplier = result;
        this.selectedValueStatus = result.statusName;
      });
  }

  save(): void {
    this.saving = true;
    this.supplier.status = this.selectedValueStatus
    
    this._supplierService.update(this.supplier).subscribe(
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
