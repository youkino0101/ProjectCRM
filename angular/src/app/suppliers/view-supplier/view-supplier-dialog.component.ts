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
import { SupplierDto } from '@shared/dto/supplier/supplier';
import { SupplierServiceProxy } from '@shared/service-proxies/supplier-service';

@Component({
  templateUrl: 'view-supplier-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class ViewSupplierDialogComponent extends AppComponentBase
  implements OnInit {
  id: number;
  supplier = new SupplierDto();
  @Input() selectListStatus: any;
  selectedValueStatus: string;

  constructor(
    injector: Injector,
    private _suppliersService: SupplierServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._suppliersService
      .get(this.id)
      .subscribe((result: SupplierDto) => {
        this.supplier = result;
        this.selectedValueStatus = result.statusName;
      });
  }
}
