import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
//dto
import { StaffDto } from '@shared/dto/staff/staff';
import { CreateStaffDto } from '@shared/dto/staff/staff-create';

import { forEach as _forEach, map as _map } from 'lodash-es';
import { StaffServiceProxy } from '@shared/service-proxies/staff-service';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-staff-dialog.component.html'
})
export class CreateStaffDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  staff = new CreateStaffDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _staffService: StaffServiceProxy,
    private _extensionService: ExtensionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getGenerateNumber();
  }

  private getGenerateNumber() {
    this._extensionService.getGenerateNumber('NV').subscribe(
      (success) => {
        this.staff.staffCode = success
      },
      (error) => {
        abp.message.error(error, 'Error')
      }
    );
  }

  save(): void {
    this.saving = true;

    const staff = new CreateStaffDto();
    staff.init(this.staff);

    this._staffService
      .create(staff)
      .subscribe(
        () => {
          abp.message.success("Mật khẩu mặc định là: 'CMS@1234'","Thành công")
          // this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
  }
}
