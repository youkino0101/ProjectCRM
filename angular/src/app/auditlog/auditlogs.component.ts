import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { LogsDto } from '@shared/dto/audit-log/LogDto';
import { LogDtoPagedResultDto } from '@shared/dto/audit-log/LogDtoPagedResultDto';
import { AuditLogServiceProxy } from '@shared/service-proxies/audit-log-service';
import { ViewAuditLogDialogComponent } from './view-log/view-log-dialog.component';

class PagedLogsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './auditlogs.component.html',
  animations: [appModuleAnimation()]
})
export class AuditLogsComponent extends PagedListingComponentBase<LogsDto> {
  logs: LogsDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _auditLogsService: AuditLogServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedLogsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._auditLogsService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: LogDtoPagedResultDto) => {
        this.logs = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  viewLog(id?: number): void {
    let viewModalDialog: BsModalRef;
    if (id) {
      viewModalDialog = this._modalService.show(
        ViewAuditLogDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: id,
          },
        }
      );
    }
  }

  delete() {
    
  }
}
