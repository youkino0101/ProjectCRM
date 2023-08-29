import { Component, Injector, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { ProductDto } from '@shared/dto/product/product';
import { ProductDtoPagedResultDto } from '@shared/dto/product/product-page';
import { ProductServiceProxy } from '@shared/service-proxies/product-service';
import { CreateProductDialogComponent } from './create-product/create-product-dialog.component';
import { ViewProductDialogComponent } from './view-product/view-product-dialog.component';
import { EditProductDialogComponent } from './edit-product/edit-product-dialog.component';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';

class PagedProductsRequestDto extends PagedRequestDto {
  keyword: string;
  status: string;
  category: string;
}

@Component({
  templateUrl: './products.component.html',
  animations: [appModuleAnimation()]
})
export class ProductsComponent extends PagedListingComponentBase<ProductDto>{
  products: ProductDto[] = [];
  keyword = '';
  selectListStatus: any[] = [];
  selectListCategory: any[] = [];
  selectedValueCate: string = '';
  selectedValueStatus: string = '';
  disabledCreate: boolean = false;
  disabledEdit: boolean = false;
  disabledView: boolean = false;

  constructor(
    injector: Injector,
    private _productsService: ProductServiceProxy,
    private _extensionService: ExtensionServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
    this._extensionService.getItemEnumStatus().subscribe(
      (success) => {
        this.selectListStatus = success;
      }
    );
    this._extensionService.getItemEnumCategory().subscribe(
      (success) => {
        this.selectListCategory = success;
      }
    );
    this.disabledCreate = this.permission.isGranted("Pages.Product.Create");
    this.disabledEdit = this.permission.isGranted("Pages.Product.Edit");
    this.disabledView = this.permission.isGranted("Pages.Product.View");
  }

  list(
    request: PagedProductsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.category = this.selectedValueCate;
    request.status = this.selectedValueStatus;
    this._productsService
      .getAll(request.keyword, request.skipCount, request.maxResultCount, request.status, request.category)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ProductDtoPagedResultDto) => {
        this.products = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(product: ProductDto): void {
    
  }

  createProduct(): void {
    this.showCreateOrEditProductDialog();
  }

  editProduct(product: ProductDto): void {
    this.showCreateOrEditProductDialog(product.id);
  }

  viewProduct(product?: ProductDto): void {
    let viewModalDialog: BsModalRef;
    if (product.id) {
      viewModalDialog = this._modalService.show(
        ViewProductDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: product.id,
            selectListStatus: this.selectListStatus,
            selectListCategory: this.selectListCategory,
          },
        }
      );
    }
  }

  private showCreateOrEditProductDialog(id?: number): void {
    let createOrEditProductDialog: BsModalRef;
    if (!id) {
      createOrEditProductDialog = this._modalService.show(
        CreateProductDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            selectListStatus: this.selectListStatus,
            selectListCategory: this.selectListCategory,
          },
        }
      );
    } else {
      createOrEditProductDialog = this._modalService.show(
        EditProductDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            id: id,
            selectListStatus: this.selectListStatus,
            selectListCategory: this.selectListCategory,
          },
        }
      );
    }

    createOrEditProductDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

}
