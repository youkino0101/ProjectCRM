import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'abp-modal-footer-view',
  templateUrl: './abp-modal-footer-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbpModalFooterViewComponent extends AppComponentBase {
  @Input() cancelLabel = this.l('Cancel');
  @Input() cancelDisabled: boolean;

  @Output() onCancelClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
