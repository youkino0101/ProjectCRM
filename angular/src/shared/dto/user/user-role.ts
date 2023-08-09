import { RoleDto } from "../role/role";

export interface IRoleDtoListResultDto {
    items: RoleDto[] | undefined;
}

export class RoleDtoListResultDto implements IRoleDtoListResultDto {
    items: RoleDto[] | undefined;

    constructor(data?: IRoleDtoListResultDto) {
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
                    this.items.push(RoleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RoleDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleDtoListResultDto();
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

    clone(): RoleDtoListResultDto {
        const json = this.toJSON();
        let result = new RoleDtoListResultDto();
        result.init(json);
        return result;
    }
}

