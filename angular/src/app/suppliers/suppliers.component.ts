import { Component, Injector, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { SupplierDto } from '@shared/dto/supplier/supplier';
import { SupplierDtoPagedResultDto } from '@shared/dto/supplier/supplier-page';
import { SupplierServiceProxy } from '@shared/service-proxies/supplier-service';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';
import { ViewSupplierDialogComponent } from './view-supplier/view-supplier-dialog.component';
import { CreateSupplierDialogComponent } from './create-supplier/create-supplier-dialog.component';
import { EditSupplierDialogComponent } from './edit-supplier/edit-supplier-dialog.component'

class PagedSuppliersRequestDto extends PagedRequestDto {
  keyword: string;
  status: string;
}

@Component({
  templateUrl: './suppliers.component.html',
  animations: [appModuleAnimation()]
})
export class SupplierComponent extends PagedListingComponentBase<SupplierDto>{
  suppliers: SupplierDto[] = [];
  keyword = '';
  selectListStatus: any[] = [];
  selectedValueStatus: string = '';
  disabledCreate: boolean = false;
  disabledEdit: boolean = false;
  disabledView: boolean = false;

  constructor(
    injector: Injector,
    private _supplierService: SupplierServiceProxy,
    private _extensionService: ExtensionServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
    this._extensionService.getItemEnumStatus().subscribe(
      (success) => {
        this.selectListStatus = success;
      }
    );
    this.disabledCreate = this.permission.isGranted("Pages.Supplier.Create");
    this.disabledEdit = this.permission.isGranted("Pages.Supplier.Edit");
    this.disabledView = this.permission.isGranted("Pages.Supplier.View");
  }

  list(
    request: PagedSuppliersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.status = this.selectedValueStatus;
    this._supplierService
      .getAll(request.keyword, request.skipCount, request.maxResultCount, request.status)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: SupplierDtoPagedResultDto) => {
        this.suppliers = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(Supplier: SupplierDto): void {
    
  }

  createSupplier(): void {
    this.showCreateOrEditSupplierDialog();
  }

  editSupplier(supplier: SupplierDto): void {
    this.showCreateOrEditSupplierDialog(supplier.id);
  }

  viewSupplier(supplier?: SupplierDto): void {
    let viewModalDialog: BsModalRef;
    if (supplier.id) {
      viewModalDialog = this._modalService.show(
        ViewSupplierDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: supplier.id,
            selectListStatus: this.selectListStatus,
          },
        }
      );
    }
  }

  private showCreateOrEditSupplierDialog(id?: number): void {
    let createOrEditSupplierDialog: BsModalRef;
    if (!id) {
      createOrEditSupplierDialog = this._modalService.show(
        CreateSupplierDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            selectListStatus: this.selectListStatus,
          },
        }
      );
    } else {
      createOrEditSupplierDialog = this._modalService.show(
        EditSupplierDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: id,
            selectListStatus: this.selectListStatus,
          },
        }
      );
    }

    createOrEditSupplierDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

}
