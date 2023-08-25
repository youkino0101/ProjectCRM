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
import { ProductEditDto } from '@shared/dto/product/product-edit';
import { ProductDto } from '@shared/dto/product/product';
import { ProductServiceProxy } from '@shared/service-proxies/product-service';
import { GenerateNumberServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'edit-product-dialog.component.html'
})
export class EditProductDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  productEdit = new ProductEditDto();
  product = new ProductDto();
  selectedValueCate: string;
  selectedValueStatus: string;
  selectListStatus: any[] = [];
  selectListCategory: any[] = [];
  selectedImage: any;
  defaultImage = 'assets/img/default.jpg';
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _extensionService: GenerateNumberServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._productService
      .get(this.id)
      .subscribe((result: ProductDto) => {
        this.product = result;
        this.selectedValueCate = result.categoryName;
        this.selectedValueStatus = result.statusName;
        this.selectedImage = result.pathImage;
      });
    this.getEnumStatus();
    this.getEnumCategory();
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

  onImageChange(event: any) {
    this.selectedImage = null
    const file = event.target.files[0];
    this.productEdit.file = file;
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.defaultImage = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  

  save(): void {
    this.saving = true;

    const formData = new FormData();
    formData.append('id', this.product.id.toString());
    formData.append('productCode', this.product.productCode);
    formData.append('productName', this.product.productName);
    formData.append('pathImage', this.product.pathImage);
    if (this.productEdit.file) {
      formData.append('file', this.productEdit.file);
    }
    this.productEdit.quantity = this.product.quantity.toString().replace(/,/g, '');
    formData.append('quantity', this.productEdit.quantity);
    this.productEdit.price = this.product.price.toString().replace(/,/g, '');
    formData.append('price', this.productEdit.price);
    formData.append('description', this.product.description);
    formData.append('category', this.selectedValueCate);
    formData.append('trademark', this.product.trademark);
    formData.append('status', this.selectedValueStatus);
    formData.forEach(key =>
        console.log(key)
        )


    this._productService.update(formData).subscribe(
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
}
