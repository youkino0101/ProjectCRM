import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  StaffServiceProxy,
  StaffDto,
  StaffDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
// import { CreateStaffComponentDialogComponent } from './create-staff/create-staff-dialog.component';
// import { EditStaffDialogComponent } from './edit-staff/edit-staff-dialog.component';

class PagedStaffsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './staffs.component.html',
  animations: [appModuleAnimation()]
})
export class StaffsComponent extends PagedListingComponentBase<StaffDto> {
  staffs: StaffDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _staffsService: StaffServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedStaffsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._staffsService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: StaffDtoPagedResultDto) => {
        this.staffs = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(staff: StaffDto): void {
    
  }

  createStaff(): void {
    this.showCreateOrEditStaffDialog();
  }

  editStaff(staff: StaffDto): void {
    this.showCreateOrEditStaffDialog(staff.id);
  }

  showCreateOrEditStaffDialog(id?: number): void {
    let createOrEditStaffDialog: BsModalRef;
    if (!id) {
      // createOrEditStaffDialog = this._modalService.show(
      //   CreateStaffDialogComponent,
      //   {
      //     class: 'modal-lg',
      //   }
      // );
    } else {
      // createOrEditStaffDialog = this._modalService.show(
      //   EditStaffDialogComponent,
      //   {
      //     class: 'modal-lg',
      //     initialState: {
      //       id: id,
      //     },
      //   }
      // );
    }

    createOrEditStaffDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
