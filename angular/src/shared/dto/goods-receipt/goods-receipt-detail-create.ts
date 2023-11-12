export class GoodsReceiptDetailCreateDto  {
    productId: number;
    productCode: string;
    productName: string;
    goodsReceiptId: string;
    unit: string;
    accordingToDocument: number;
    actuallyImported: number;
    unitPrice: number;
    amount: number;

    constructor(data?: GoodsReceiptDetailCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
