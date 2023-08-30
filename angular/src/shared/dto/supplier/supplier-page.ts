import { SupplierDto } from "./supplier";

export interface ISupplierDtoPagedResultDto {
    items: SupplierDto[] | undefined;
    totalCount: number;
}

export class SupplierDtoPagedResultDto implements ISupplierDtoPagedResultDto {
    items: SupplierDto[] | undefined;
    totalCount: number;

    constructor(data?: ISupplierDtoPagedResultDto) {
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
                    this.items.push(SupplierDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): SupplierDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new SupplierDtoPagedResultDto();
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

    clone(): SupplierDtoPagedResultDto {
        const json = this.toJSON();
        let result = new SupplierDtoPagedResultDto();
        result.init(json);
        return result;
    }
}
