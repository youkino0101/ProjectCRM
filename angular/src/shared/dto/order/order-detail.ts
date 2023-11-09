export interface IOrderDetailDto {
    id: number;
    number: number;
    productCode: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

export class OrderDetailDto  {
    id: number;
    number: number;
    productCode: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    amount: number;

    constructor(data?: OrderDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.number = _data["number"];
            this.productCode = _data["productCode"];
            this.productName = _data["productName"];
            this.quantity = _data["quantity"];
            this.unitPrice = _data["unitPrice"];
            this.amount = _data["amount"];
        }
    }

    static fromJS(data: any): OrderDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"]= this.id ;
        data["number"]= this.number ;
        data["productCode"]= this.productCode ;
        data["productName"]= this.productName ;
        data["quantity"]= this.quantity ;
        data["unitPrice"]= this.unitPrice ;
        data["amount"]= this.amount;
        return data;
    }

    clone(): OrderDetailDto {
        const json = this.toJSON();
        let result = new OrderDetailDto();
        result.init(json);
        return result;
    }
}
