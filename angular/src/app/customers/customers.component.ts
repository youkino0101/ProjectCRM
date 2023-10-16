import { Component, Injector, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { CustomerDto } from '@shared/dto/customer/customer';
import { CustomerDtoPagedResultDto } from '@shared/dto/customer/customer-page';
import { CustomerServiceProxy } from '@shared/service-proxies/customer-service';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';
import { ViewCustomerDialogComponent } from './view-customer/view-customer-dialog.component';
import { CreateCustomerDialogComponent } from './create-customer/create-customer-dialog.component';
import { EditCustomerDialogComponent } from './edit-customer/edit-customer-dialog.component';

class PagedCustomersRequestDto extends PagedRequestDto {
  keyword: string;
  status: string;
}

@Component({
  templateUrl: './customers.component.html',
  animations: [appModuleAnimation()]
})
export class CustomerComponent extends PagedListingComponentBase<CustomerDto>{
  customers: CustomerDto[] = [];
  keyword = '';
  selectListStatus: any[] = [];
  selectedValueStatus: string = '';
  disabledCreate: boolean = false;
  disabledEdit: boolean = false;
  disabledView: boolean = false;

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private _extensionService: ExtensionServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
    this._extensionService.getItemEnumStatus().subscribe(
      (success) => {
        this.selectListStatus = success;
      }
    );
    this.disabledCreate = this.permission.isGranted("Pages.Customer.Create");
    this.disabledEdit = this.permission.isGranted("Pages.Customer.Edit");
    this.disabledView = this.permission.isGranted("Pages.Customer.View");
  }

  list(
    request: PagedCustomersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.status = this.selectedValueStatus;
    this._customerService
      .getAll(request.keyword, request.skipCount, request.maxResultCount, request.status)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CustomerDtoPagedResultDto) => {
        this.customers = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(Customer: CustomerDto): void {
    
  }

  createCustomer(): void {
    this.showCreateOrEditCustomerDialog();
  }

  editCustomer(customer: CustomerDto): void {
    this.showCreateOrEditCustomerDialog(customer.id);
  }

  viewCustomer(customer?: CustomerDto): void {
    let viewModalDialog: BsModalRef;
    if (customer.id) {
      viewModalDialog = this._modalService.show(
        ViewCustomerDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: customer.id,
            selectListStatus: this.selectListStatus,
          },
        }
      );
    }
  }

  private showCreateOrEditCustomerDialog(id?: number): void {
    let createOrEditCustomerDialog: BsModalRef;
    if (!id) {
      createOrEditCustomerDialog = this._modalService.show(
        CreateCustomerDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            selectListStatus: this.selectListStatus,
          },
        }
      );
    } else {
      createOrEditCustomerDialog = this._modalService.show(
        EditCustomerDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: id,
            selectListStatus: this.selectListStatus,
          },
        }
      );
    }

    createOrEditCustomerDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

}
