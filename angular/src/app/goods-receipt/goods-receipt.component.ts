import { Component, ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductDto } from '@shared/dto/product/product';
import { GoodsReceiptDetailCreateDto } from '@shared/dto/goods-receipt/goods-receipt-detail-create';
import { ProductServiceProxy } from '@shared/service-proxies/product-service';
import 'select2';
import { CustomerServiceProxy } from '@shared/service-proxies/customer-service';
import { SelectDto } from '@shared/dto/goods-receipt/select';
import { StaffServiceProxy } from '@shared/service-proxies/staff-service';
import { StaffDto } from '@shared/dto/staff/staff';
import { GoodsReceiptCreateDto } from '@shared/dto/goods-receipt/goods-receipt-create'
import { GoodsReceiptServiceProxy } from '@shared/service-proxies/goods-receipt-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { GoodsReceiptDetailComponent } from './goods-receipt-detail/goods-receipt-detail.component';
import { CreateCustomerDialogComponent } from '@app/customers/create-customer/create-customer-dialog.component';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';
import { SupplierServiceProxy } from '@shared/service-proxies/supplier-service';
import { CreateSupplierDialogComponent } from '@app/suppliers/create-supplier/create-supplier-dialog.component';
import { CreateProductDialogComponent } from '@app/product/create-product/create-product-dialog.component';
declare var $: any;

@Component({
  templateUrl: './goods-receipt.component.html',
  animations: [appModuleAnimation()]
})
export class GoodsReceiptsComponent extends AppComponentBase {
  products: ProductDto[] = [];
  searchText = '';
  totalPrice = 0;
  goodsReceiptDetail: GoodsReceiptDetailCreateDto[] = [];
  showDropdown = false;
  searchResults: ProductDto[] = []; // Kết quả tìm kiếm sẽ ở 
  supplierSelect: SelectDto[] = []; 
  staff = new StaffDto();
  goodsReceiptCreate = new GoodsReceiptCreateDto();
  selectedValue: number;
  selectListStatus: any[] = [];
  selectListCategory: any[] = [];

  constructor(
    injector: Injector,
    private _productsService: ProductServiceProxy,
    private _staffService: StaffServiceProxy,
    private _supplierService: SupplierServiceProxy,
    private _goodsReceiptService: GoodsReceiptServiceProxy,
    private _extensionService: ExtensionServiceProxy,
    private _modalService: BsModalService
    ) {
    super(injector);
    this._productsService.search().subscribe((success) => {
      this.products = success.items;
    });
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
  }

  ngOnInit() {
    this._staffService.getSession().subscribe((success) => {
      this.staff = success;
    })
    this._supplierService.select().subscribe((success) => {
      this.supplierSelect = success.items;
      $('#mySelect1').select2({
        placeholder: 'Select an option',
        data: this.supplierSelect
      });
    });
    const self = this;
    $('#mySelect').on('change', function() {
      self.goodsReceiptCreate.supplierId = $(this).val();
    });
  }
  
  onSearch() {
    this.searchResults = this.products.filter(item =>
      item.productCode.toLowerCase().includes(this.searchText.toLowerCase()) || 
      item.productName.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.showDropdown = this.searchText.length > 0;
  }
  
  

  addItemToTable(item: ProductDto) {
    var existProduct = this.products.find(product => product.productCode === item.productCode)
    if (existProduct) {
      abp.message.warn("Sản phẩm đã tồn tại", "Cảnh báo")
    } else {
      this.goodsReceiptDetail.push(this.convertToGoodsReceiptDetailDto(item));
    }
    this.searchText = '';
    this.showDropdown = false;
    this.allTotalPrice()
  }

  updateTotal(index: number) {
    if(this.goodsReceiptDetail[index].actuallyImported < 0) {
      this.goodsReceiptDetail[index].actuallyImported = 1;
    }
    this.goodsReceiptDetail[index].amount = this.goodsReceiptDetail[index].actuallyImported * this.goodsReceiptDetail[index].unitPrice;
    this.allTotalPrice()
    
  }

  deleteProduct(index: number) {
    this.goodsReceiptDetail.splice(index, 1);
    this.allTotalPrice()
  }
 
  allTotalPrice() {
    this.totalPrice = this.goodsReceiptDetail.reduce((total, product) => total + product.actuallyImported * product.unitPrice, 0);
  }

  private convertToGoodsReceiptDetailDto(product :ProductDto): GoodsReceiptDetailCreateDto {
    return {
      productId: product.id,
      productName: product.productName,
      productCode: product.productCode,
      actuallyImported : 0,
      unitPrice: 0,
      accordingToDocument: 0,
      goodsReceiptId: null,
      unit: "VNĐ",
      amount: product.price
    }
  }

  save(): void {
    this.initGoodsReceipt();
    this._goodsReceiptService.create(this.goodsReceiptCreate).subscribe(
      (success) => {
        abp.message.success("Nhập hàng thành công!", 'Thành công')
      },
      (error) => {
        console.log(error)
        abp.message.error(error.message, 'Error')
      }
    )
    
  }
  
  private initGoodsReceipt(): void {
    this.goodsReceiptCreate.supplierId;
    this.goodsReceiptCreate.goodsReceiptCode = "";
    this.goodsReceiptCreate.staffId = this.staff.id;
    this.goodsReceiptCreate.totalPrice = this.totalPrice;
    this.goodsReceiptCreate.listGoodsReceiptDetail = this.goodsReceiptDetail;
  }

  refresh(): void {
    window.location.reload();
  }

  createSupplier(): void {
    let viewModalDialog: BsModalRef;
      viewModalDialog = this._modalService.show(
        CreateSupplierDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            selectListStatus: this.selectListStatus,
          },
        }
      );
      viewModalDialog.content.onSave.subscribe(() => {
        this._supplierService.select().subscribe((success) => {
          this.supplierSelect = success.items;
          $('#mySelect1').select2({
            placeholder: 'Select an option',
            data: this.supplierSelect
          });
        });
      });
    }

  createProduct(): void {
    let viewModalDialog: BsModalRef;
      viewModalDialog = this._modalService.show(
        CreateProductDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            selectListStatus: this.selectListStatus,
            selectListCategory: this.selectListCategory
          },
        }
      );
      viewModalDialog.content.onSave.subscribe(() => {
        this._productsService.search().subscribe((success) => {
          this.products = success.items;
        });
      });
    }
}
