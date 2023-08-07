// import {
//   Component,
//   Injector,
//   OnInit,
//   EventEmitter,
//   Output,
// } from '@angular/core';
// import { BsModalRef } from 'ngx-bootstrap/modal';
// import { AppComponentBase } from '@shared/app-component-base';
// import {
//   StaffServiceProxy,
//   StaffDto,
//   PermissionDto,
//   CreateStaffDto,
//   PermissionDtoListResultDto
// } from '@shared/service-proxies/service-proxies';
// import { forEach as _forEach, map as _map } from 'lodash-es';

// @Component({
//   templateUrl: 'create-staff-dialog.component.html'
// })
// export class CreateStaffDialogComponent extends AppComponentBase
//   implements OnInit {
//   saving = false;
//   staff = new StaffDto();
//   permissions: PermissionDto[] = [];
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
//     this._staffService
//       .getAllPermissions()
//       .subscribe((result: PermissionDtoListResultDto) => {
//         this.permissions = result.items;
//         this.setInitialPermissionsStatus();
//       });
//   }

//   setInitialPermissionsStatus(): void {
//     _map(this.permissions, (item) => {
//       this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
//         item.name
//       );
//     });
//   }

//   isPermissionChecked(permissionName: string): boolean {
//     // just return default permission checked status
//     // it's better to use a setting
//     return this.defaultPermissionCheckedStatus;
//   }

//   onPermissionChange(permission: PermissionDto, $event) {
//     this.checkedPermissionsMap[permission.name] = $event.target.checked;
//   }

//   getCheckedPermissions(): string[] {
//     const permissions: string[] = [];
//     _forEach(this.checkedPermissionsMap, function (value, key) {
//       if (value) {
//         permissions.push(key);
//       }
//     });
//     return permissions;
//   }

//   save(): void {
//     this.saving = true;

//     const staff = new CreateStaffDto();
//     staff.init(this.staff);
//     staff.grantedPermissions = this.getCheckedPermissions();

//     this._staffService
//       .create(staff)
//       .subscribe(
//         () => {
//           this.notify.info(this.l('SavedSuccessfully'));
//           this.bsModalRef.hide();
//           this.onSave.emit();
//         },
//         () => {
//           this.saving = false;
//         }
//       );
//   }
// }
