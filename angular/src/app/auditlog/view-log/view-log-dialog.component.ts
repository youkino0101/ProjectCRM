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
import { LogsDto } from '@shared/dto/audit-log/LogDto';
import { AuditLogServiceProxy } from '@shared/service-proxies/audit-log-service';

@Component({
  templateUrl: 'view-log-dialog.component.html'
})
export class ViewAuditLogDialogComponent extends AppComponentBase
  implements OnInit {
  id: number;
  log = new LogsDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _logService: AuditLogServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._logService
      .get(this.id)
      .subscribe((result: LogsDto) => {
        this.log = result;
      });
  }
}
