import { OrderDetailDto } from "./order-detail";

export interface IOrdersDto {
    id: number;
    orderCode: string;
    warehouse: string;
    staffName: string;
    customerName: string;
    statusOrder: string;
    totalPrice: number;
    creationTime: string;
}

export class OrdersDto implements IOrdersDto {
    id: number;
    orderCode: string;
    warehouse: string;
    staffName: string;
    customerName: string;
    statusOrder: string;
    totalPrice: number;
    creationTime: string;

    constructor(data?: OrdersDto) {
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
            this.orderCode = _data["orderCode"];
            this.warehouse = _data["warehouse"];
            this.staffName = _data["staffName"];
            this.customerName = _data["customerName"];
            this.statusOrder = _data["statusOrder"];
            this.totalPrice = _data["totalPrice"];
            this.creationTime = _data["creationTime"];
        }
    }

    static fromJS(data: any): OrdersDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrdersDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"]= this.id ;
        data["orderCode"]= this.orderCode ;
        data["warehouse"]= this.warehouse ;
        data["staffName"]= this.staffName ;
        data["totalPrice"]= this.totalPrice;
        data["creationTime"]= this.creationTime;
        data["statusOrder"]= this.statusOrder;
        return data;
    }

    clone(): OrdersDto {
        const json = this.toJSON();
        let result = new OrdersDto();
        result.init(json);
        return result;
    }
}
