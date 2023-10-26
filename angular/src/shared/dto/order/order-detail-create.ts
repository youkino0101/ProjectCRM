export class OrderDetailCreateDto  {
    productId: number;
    productCode: string;
    productName: string;
    orderId: number;
    unit: string;
    quantity: number;
    unitPrice: number;
    amount: number;

    constructor(data?: OrderDetailCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
