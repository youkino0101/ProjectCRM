import { Component, ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductDto } from '@shared/dto/product/product';
import { OrderDetailCreateDto } from '@shared/dto/order/order-detail-create';
import { ProductServiceProxy } from '@shared/service-proxies/product-service';
import 'select2';
import { CustomerServiceProxy } from '@shared/service-proxies/customer-service';
import { SelectDto } from '@shared/dto/order/select';
import { StaffServiceProxy } from '@shared/service-proxies/staff-service';
import { StaffDto } from '@shared/dto/staff/staff';
import { OrderCreateDto } from '@shared/dto/order/order-create'
import { OrderServiceProxy } from '@shared/service-proxies/order-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CreateCustomerDialogComponent } from '@app/customers/create-customer/create-customer-dialog.component';
import { ExtensionServiceProxy } from '@shared/service-proxies/service-proxies';
declare var $: any;

@Component({
  templateUrl: './orders.component.html',
  animations: [appModuleAnimation()]
})
export class OrdersComponent extends AppComponentBase implements OnInit {
  products: ProductDto[] = [];
  searchText = '';
  totalPrice = 0;
  orderDetail: OrderDetailCreateDto[] = [];
  showDropdown = false;
  searchResults: ProductDto[] = []; // Kết quả tìm kiếm sẽ ở 
  customerSelect: SelectDto[] = []; 
  staff = new StaffDto();
  orderCreate = new OrderCreateDto();
  selectedValue: number;
  selectListStatus: any[] = [];

  constructor(
    injector: Injector,
    private _productsService: ProductServiceProxy,
    private _customerService: CustomerServiceProxy,
    private _staffService: StaffServiceProxy,
    private _orderService: OrderServiceProxy,
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
  }

  ngOnInit() {
    this._staffService.getSession().subscribe((success) => {
      this.staff = success;
    })
    this._customerService.select().subscribe((success) => {
      this.customerSelect = success.items;
      $('#mySelect').select2({
        placeholder: 'Select an option',
        data: this.customerSelect
      });
    });
    const self = this;
    $('#mySelect').on('change', function() {
      self.orderCreate.customerId = $(this).val();
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
    var existProduct = this.orderDetail.find(product => product.productCode === item.productCode)
    if (existProduct) {
      existProduct.quantity++;
      existProduct.amount = existProduct.quantity * existProduct.unitPrice;
    } else {
      this.orderDetail.push(this.convertToOrderDetailDto(item));
    }
    this.searchText = '';
    this.showDropdown = false;
    this.allTotalPrice()
  }

  updateTotal(index: number) {
    if(this.orderDetail[index].quantity < 0) {
      this.orderDetail[index].quantity = 1;
    }
    this.orderDetail[index].amount = this.orderDetail[index].quantity * this.orderDetail[index].unitPrice;
    this.allTotalPrice()
    
  }

  deleteProduct(index: number) {
    this.orderDetail.splice(index, 1);
    this.allTotalPrice()
  }
 
  allTotalPrice() {
    this.totalPrice = this.orderDetail.reduce((total, product) => total + product.quantity * product.unitPrice, 0);
  }

  private convertToOrderDetailDto(product :ProductDto): OrderDetailCreateDto {
    return {
      productId: product.id,
      productCode: product.productCode,
      productName: product.productName,
      quantity : 1,
      unitPrice: product.price,
      orderId: null,
      unit: "VNĐ",
      amount: product.price
    }
  }

  save(): void {
    this.initOrder();
    this._orderService.create(this.orderCreate).subscribe(
      (success) => {
        abp.message.confirm(
          this.l('Bạn có muốn tiến tới trang hóa đơn?'),
          "Đã tạo thành công đơn hàng!",
          (result: boolean) => {
            if (result) {
              let viewInvoice: BsModalRef;
              viewInvoice = this._modalService.show(
                OrderDetailComponent,
                {
                  class: 'modal-xl',
                  initialState: {
                    id: success.id
                  },
                }
              );
            } else {
              this.refresh()
            }
          }
       );
      },
      (error) => {
        console.log(error)
        abp.message.error(error.message, 'Error')
      }
    )
    
  }
  
  private initOrder(): void {
    this.orderCreate.customerId;
    this.orderCreate.orderCode = "";
    this.orderCreate.staffId = this.staff.id;
    this.orderCreate.totalPrice = this.totalPrice;
    this.orderCreate.warehouse = "Kho 1";
    this.orderCreate.listOrderDetail = this.orderDetail;
  }

  refresh(): void {
    window.location.reload();
  }

  createCustomer(): void {
    let viewModalDialog: BsModalRef;
      viewModalDialog = this._modalService.show(
        CreateCustomerDialogComponent,
        {
          class: 'modal-xl',
          initialState: {
            selectListStatus: this.selectListStatus,
          },
        }
      );
      viewModalDialog.content.onSave.subscribe(() => {
        this._customerService.select().subscribe((success) => {
          this.customerSelect = success.items;
          $('#mySelect').select2({
            placeholder: 'Select an option',
            data: this.customerSelect
          });
        });
      });
    }
}
