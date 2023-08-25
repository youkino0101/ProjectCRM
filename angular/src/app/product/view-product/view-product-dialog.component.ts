import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductDto } from '@shared/dto/product/product';
import { ProductServiceProxy } from '@shared/service-proxies/product-service';
import { GenerateNumberServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'view-product-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class ViewProductDialogComponent extends AppComponentBase
  implements OnInit {
  id: number;
  product = new ProductDto();
  selectListStatus: any[] = [];
  selectListCategory: any[] = [];
  selectedValueCate: string;
  selectedValueStatus: string;

  constructor(
    injector: Injector,
    private _productsService: ProductServiceProxy,
    private _extensionService: GenerateNumberServiceProxy,
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
    this.getEnumStatus();
    this.getEnumCategory();
  }

  private getEnumStatus() {
    this._extensionService.getItemEnumStatus().subscribe(
      (success) => {
        this.selectListStatus = success;
      }
    );
  }

  private getEnumCategory() {
    this._extensionService.getItemEnumCategory().subscribe(
      (success) => {
        this.selectListCategory = success;
      }
    );
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
