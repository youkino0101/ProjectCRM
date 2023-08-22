import { RoleListDto } from "./role-list";

export interface IRoleListDtoListResultDto {
    items: RoleListDto[] | undefined;
}

export class RoleListDtoListResultDto implements IRoleListDtoListResultDto {
    items: RoleListDto[] | undefined;

    constructor(data?: IRoleListDtoListResultDto) {
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
                    this.items.push(RoleListDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RoleListDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleListDtoListResultDto();
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

    clone(): RoleListDtoListResultDto {
        const json = this.toJSON();
        let result = new RoleListDtoListResultDto();
        result.init(json);
        return result;
    }
}

