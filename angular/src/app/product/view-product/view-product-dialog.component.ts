import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductDto } from '@shared/dto/product/product';
import { ProductServiceProxy } from '@shared/service-proxies/product-service';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'view-product-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class ViewProductDialogComponent extends AppComponentBase
  implements OnInit {
  id: number;
  product = new ProductDto();
  @Input() selectListStatus: any;
  @Input() selectListCategory: any;
  selectedValueCate: string;
  selectedValueStatus: string;

  constructor(
    injector: Injector,
    private _productsService: ProductServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._productsService
      .get(this.id)
      .subscribe((result: ProductDto) => {
        this.product = result;
        this.selectedValueCate = result.categoryName;
        this.selectedValueStatus = result.statusName;
      });
  }

  formatWithCommas(value) {
    const valueWithoutCommas = value.replace(/,/g, '');
    const formatted = valueWithoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formatted;
  }
  
  onInputChangePrice(value: any) {
    this.product.price = this.formatWithCommas(value);
  }
  
  onInputChangeQuantity(value: any) {
    this.product.quantity = this.formatWithCommas(value);
  }
}
