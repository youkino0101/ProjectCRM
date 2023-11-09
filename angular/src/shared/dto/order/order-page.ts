import { OrdersDto } from "./orders";

export interface IOrderDtoPagedResultDto {
    items: OrdersDto[] | undefined;
    totalCount: number;
}

export class OrderDtoPagedResultDto implements IOrderDtoPagedResultDto {
    items: OrdersDto[] | undefined;
    totalCount: number;

    constructor(data?: OrderDtoPagedResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items.push(OrdersDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): OrderDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDtoPagedResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        data["totalCount"] = this.totalCount;
        return data;
    }

    clone(): OrderDtoPagedResultDto {
        const json = this.toJSON();
        let result = new OrderDtoPagedResultDto();
        result.init(json);
        return result;
    }
}