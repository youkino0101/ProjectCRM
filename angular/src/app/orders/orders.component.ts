import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductDto } from '@shared/dto/product/product';
import { OrderDetailCreateDto } from '@shared/dto/order/order-detail-create';
import { ProductServiceProxy } from '@shared/service-proxies/product-service';

@Component({
  templateUrl: './orders.component.html',
  animations: [appModuleAnimation()]
})
export class OrdersComponent extends AppComponentBase{
  products: ProductDto[] = [];
  searchText = '';
  totalPrice = 0;
  orderDetail: OrderDetailCreateDto[] = [];
  showDropdown = false;
  searchResults: ProductDto[] = []; // Kết quả tìm kiếm sẽ ở đây

  constructor(
    injector: Injector,
    private _productsService: ProductServiceProxy
  ) {
    super(injector);
    this._productsService.search().subscribe((success) => {
      this.products = success.items;
    })
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
}
