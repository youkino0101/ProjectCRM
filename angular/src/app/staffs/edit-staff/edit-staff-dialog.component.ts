import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { StaffServiceProxy } from '@shared/service-proxies/staff-service';
import { StaffDto } from '@shared/dto/staff/staff';
import { EditStaffDto } from '@shared/dto/staff/staff-edit'
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'edit-staff-dialog.component.html'
})
export class EditStaffDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  staff = new EditStaffDto();
  selectListStaffStatus: any[] = [];
  selectedValueStaffStatus: string;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _staffService: StaffServiceProxy,
    private _extensionService: ExtensionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
    this._extensionService.getItemEnumStaffStatus().subscribe(
      (success) => {
        this.selectListStaffStatus = success;
        
      }
    );
  }

  ngOnInit(): void {
    this._staffService
      .get(this.id)
      .subscribe((result: StaffDto) => {
          this.staff = result;
          this.selectedValueStaffStatus = result.staffStatusName
          const selectedDate: Date = new Date(result.birthDate);

          // Thêm một ngày
          selectedDate.setDate(selectedDate.getDate() + 1);
        
          // Biến đổi thành định dạng "yyyy-MM-dd"
          const formattedDate: string = selectedDate.toISOString().split('T')[0];
          this.staff.birthDate = formattedDate;
      });
      
  }
 
  save(): void {
    this.saving = true;

    const staff = new StaffDto();
    staff.init(this.staff);
    staff.staffStatus = this.selectedValueStaffStatus

    this._staffService.update(staff).subscribe(
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
