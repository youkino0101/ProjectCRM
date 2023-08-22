
export interface IInt64EntityDto {
    id: number;
}

export class Int64EntityDto implements IInt64EntityDto {
    id: number;

    constructor(data?: IInt64EntityDto) {
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
        }
    }

    static fromJS(data: any): Int64EntityDto {
        data = typeof data === 'object' ? data : {};
        let result = new Int64EntityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data;
    }

    clone(): Int64EntityDto {
        const json = this.toJSON();
        let result = new Int64EntityDto();
        result.init(json);
        return result;
    }
}
