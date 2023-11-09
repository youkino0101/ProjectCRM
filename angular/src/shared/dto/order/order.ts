import { OrderDetailDto } from "./order-detail";

export interface IOrderDto {
    id: number;
    orderCode: string;
    warehouse: string;
    staffName: string;
    addressCompany: string;
    phoneNumberCompany: string;
    emailCompany: string;
    customerName: string;
    addressCustomer: string;
    phoneNumberCustomer: string;
    emailCustomer: string;
    orderDetailDtos: OrderDetailDto[] | undefined;
    totalPrice: number;
    creationTime: string;
}

export class OrderDto  implements IOrderDto {
    id: number;
    orderCode: string;
    warehouse: string;
    staffName: string;
    addressCompany: string;
    phoneNumberCompany: string;
    emailCompany: string;
    customerName: string;
    addressCustomer: string;
    phoneNumberCustomer: string;
    emailCustomer: string;
    orderDetailDtos: OrderDetailDto[] | undefined;
    totalPrice: number;
    creationTime: string;

    constructor(data?: OrderDto) {
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
            this.addressCompany = _data["addressCompany"];
            this.phoneNumberCompany = _data["phoneNumberCompany"];
            this.emailCompany = _data["emailCompany"];
            this.customerName = _data["customerName"];
            this.addressCustomer = _data["addressCustomer"];
            this.phoneNumberCustomer = _data["phoneNumberCustomer"];
            this.emailCustomer = _data["emailCustomer"];
            this.totalPrice = _data["totalPrice"];
            this.creationTime = _data["creationTime"];

            if (Array.isArray(_data["orderDetailDtos"])) {
                this.orderDetailDtos = [] as any;
                for (let item of _data["orderDetailDtos"])
                    this.orderDetailDtos.push(item);
            }
            
        }
    }

    static fromJS(data: any): OrderDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"]= this.id ;
        data["orderCode"]= this.orderCode ;
        data["warehouse"]= this.warehouse ;
        data["staffName"]= this.staffName ;
        data["addressCompany"]= this.addressCompany ;
        data["phoneNumberCompany"]= this.phoneNumberCompany ;
        data["emailCompany"]= this.emailCompany;
        data["customerName"]= this.customerName ;
        data["addressCustomer"]= this.addressCustomer ;
        data["phoneNumberCustomer"]= this.phoneNumberCustomer ;
        data["emailCustomer"]= this.emailCustomer ;
        data["totalPrice"]= this.totalPrice;
        data["creationTime"]= this.creationTime;
        if (Array.isArray(this.orderDetailDtos)) {
            data["orderDetailDtos"] = [];
            for (let item of this.orderDetailDtos)
                data["orderDetailDtos"].push(item);
        }
        return data;
    }

    clone(): OrderDto {
        const json = this.toJSON();
        let result = new OrderDto();
        result.init(json);
        return result;
    }
}
