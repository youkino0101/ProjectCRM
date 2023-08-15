import { Component, Injector } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { AppTenantAvailabilityState } from '@shared/AppEnums';

import { AccountServiceProxy } from '@shared/service-proxies/account-service';
import { IsTenantAvailableInput } from '@shared/dto/account/account-is-tenant-available-input';
import { IsTenantAvailableOutput } from '@shared/dto/account/account-is-tenant-available-output';

@Component({
  templateUrl: './tenant-change-dialog.component.html'
})
export class TenantChangeDialogComponent extends AppComponentBase {
  saving = false;
  tenancyName = '';

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  save(): void {
    if (!this.tenancyName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      this.bsModalRef.hide();
      location.reload();
      return;
    }

    const input = new IsTenantAvailableInput();
    input.tenancyName = this.tenancyName;

    this.saving = true;
    this._accountService.isTenantAvailable(input).subscribe(
      (result: IsTenantAvailableOutput) => {
        switch (result.state) {
          case AppTenantAvailabilityState.Available:
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            location.reload();
            return;
          case AppTenantAvailabilityState.InActive:
            this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
            break;
          case AppTenantAvailabilityState.NotFound:
            this.message.warn(
              this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName)
            );
            break;
        }
      },
      () => {
        this.saving = false;
      }
    );
  }
}
