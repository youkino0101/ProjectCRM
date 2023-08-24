import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
//dto
import { ProductCreateDto } from '@shared/dto/product/product-create';
import { ProductServiceProxy } from '@shared/service-proxies/product-service';
import { GenerateNumberServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-product-dialog.component.html'
})
export class CreateProductDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  form: FormData;
  product = new ProductCreateDto();
  selectedImage: any;
  defaultImage = 'assets/img/default.jpg';
  selectListStatus: any[] = [];
  selectListCategory: any[] = [];
  selectedValueCate: string;
  selectedValueStatus: string;
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
    this._extensionService.getGenerateNumber('P').subscribe(
      (success) => {
        this.product.productCode = success
      },
      (error) => {
        abp.message.error(error, 'Error')
        this.saving = false;
      }
    );

    this._extensionService.getItemEnumStatus().subscribe(
      success => {
        console.log(success);
        this.selectListStatus = success;
      }
    );
    this._extensionService.getItemEnumCategory().subscribe(
      success => {
        console.log(success);
        this.selectListCategory = success;
      }
    );
  }

  save(): void {
    this.saving = true;
    
    const formData = new FormData();
    formData.append('productCode', this.product.productCode);
    formData.append('productName', this.product.productName);
    formData.append('pathImage', null);
    if (this.product.file) {
      formData.append('file', this.product.file);
    }
    this.product.quantity = this.product.quantity.replace(/,/g, '');
    formData.append('quantity', this.product.quantity);
    this.product.price = this.product.price.replace(/,/g, '');
    formData.append('price', this.product.price);
    formData.append('description', this.product.description);
    formData.append('category', this.product.category);
    formData.append('trademark', this.product.trademark);
    formData.append('status', this.product.status);

    this._productService
      .create(formData)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        (error) => {
          abp.message.error(error, 'Error')
          this.saving = false;
        }
      );
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    this.product.file = file;
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };

      reader.readAsDataURL(file);
    }
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

  onSelectionChange() {
    this.product.category = this.selectedValueCate;
  }

  onSelectionChange1() {
    this.product.status = this.selectedValueStatus;
  }
}
