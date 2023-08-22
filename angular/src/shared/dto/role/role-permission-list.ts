import { PermissionDto } from "./role-permission";

export interface IPermissionDtoListResultDto {
    items: PermissionDto[] | undefined;
}

export class PermissionDtoListResultDto implements IPermissionDtoListResultDto {
    items: PermissionDto[] | undefined;

    constructor(data?: IPermissionDtoListResultDto) {
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
                    this.items.push(PermissionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PermissionDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new PermissionDtoListResultDto();
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
        return data;
    }

    clone(): PermissionDtoListResultDto {
        const json = this.toJSON();
        let result = new PermissionDtoListResultDto();
        result.init(json);
        return result;
    }
}

