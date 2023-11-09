import { SelectDto } from "./select";

export interface ISelectListDto {
    items: SelectDto[] | undefined;
}

export class SelectListDto implements ISelectListDto {
    items: SelectDto[] | undefined;

    constructor(data?: ISelectListDto) {
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
                    this.items.push(SelectDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SelectListDto {
        data = typeof data === 'object' ? data : {};
        let result = new SelectListDto();
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

    clone(): SelectListDto {
        const json = this.toJSON();
        let result = new SelectListDto();
        result.init(json);
        return result;
    }
}

