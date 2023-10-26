import { OrderDetailCreateDto } from "./order-detail-create";

export class OrderCreateDto  {
    orderCode: string;
    warehouse: string;
    customerId: number;
    staffid: number;
    statusOrder: string;
    totalPrice: number;
    listOrderDetail: OrderDetailCreateDto[] | undefined;

    constructor(data?: OrderCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
