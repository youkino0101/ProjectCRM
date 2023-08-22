// import {
//   Component,
//   Injector,
//   OnInit,
//   EventEmitter,
//   Output,
// } from '@angular/core';
// import { BsModalRef } from 'ngx-bootstrap/modal';
// import { AppComponentBase } from '@shared/app-component-base';
// //dto
// import { StaffDto } from '@shared/dto/staff/staff';
// import { CreateStaffDto } from '@shared/dto/staff/staff-create';

// import { forEach as _forEach, map as _map } from 'lodash-es';
// import { StaffServiceProxy } from '@shared/service-proxies/staff-service';

// @Component({
//   templateUrl: 'create-staff-dialog.component.html'
// })
// export class CreateStaffDialogComponent extends AppComponentBase
//   implements OnInit {
//   saving = false;

//   staff: CreateStaffDto = new CreateStaffDto('','','','',null ,'',null);
//   checkedPermissionsMap: { [key: string]: boolean } = {};
//   defaultPermissionCheckedStatus = true;

//   @Output() onSave = new EventEmitter<any>();

//   constructor(
//     injector: Injector,
//     private _staffService: StaffServiceProxy,
//     public bsModalRef: BsModalRef
//   ) {
//     super(injector);
//   }

//   ngOnInit(): void {
   
//   }

//   submitForm(form: any) {
//     if (form.valid) {
//       const formData = new FormData();
//       formData.append('staffCode', this.staff.staffCode);
//       formData.append('staffName', this.staff.staffName);
//       formData.append('phoneNumber', this.staff.phoneNumber);
//       formData.append('email', this.staff.email);
//       formData.append('birthDate', this.staff.birthDate.toString());
//       formData.append('address', this.staff.address);
//       formData.append('staffStatus', "0");
//       if (this.staff.file) {
//         formData.append('file', this.staff.file);
//       }
//       formData.forEach((value, key) => {
//         console.log(key, value);
//       });

//       this._staffService
//       .create(formData)
//       .subscribe(
//         () => {
//             abp.message.success('Thành công', 'Success')
//         },
//         (error) => {
//             abp.message.error(error, 'Error')
//         }
//       );
//     }
//   }

//   onImageChange(event: any) {
//     const file = event.target.files[0];
//     this.staff.file = file;
//   }

// //   save(): void {
// //     this.saving = true;

// //     const staff = new CreateStaffDto();
// //     staff.init(this.staff);

// //     this._staffService
// //       .create(staff)
// //       .subscribe(
// //         () => {
// //           this.notify.info(this.l('SavedSuccessfully'));
// //           this.bsModalRef.hide();
// //           this.onSave.emit();
// //         },
// //         () => {
// //           this.saving = false;
// //         }
// //       );
// //   }
// }
