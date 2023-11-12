import { GoodsReceiptDetailCreateDto } from "./goods-receipt-detail-create";

export class GoodsReceiptCreateDto  {
    goodsReceiptCode: string;
    supplierId: number;
    staffId: number;
    totalPrice: number;
    listGoodsReceiptDetail: GoodsReceiptDetailCreateDto[] | undefined;

    constructor(data?: GoodsReceiptCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
