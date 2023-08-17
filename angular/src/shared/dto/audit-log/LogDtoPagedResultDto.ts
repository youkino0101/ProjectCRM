import { LogDto } from "./LogDto";

export interface ILogDtoPagedResultDto {
    items: LogDto[] | undefined;
    totalCount: number;
}

export class LogDtoPagedResultDto implements ILogDtoPagedResultDto {
    items: LogDto[] | undefined;
    totalCount: number;

    constructor(data?: ILogDtoPagedResultDto) {
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
                    this.items.push(LogDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): LogDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new LogDtoPagedResultDto();
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

    clone(): LogDtoPagedResultDto {
        const json = this.toJSON();
        let result = new LogDtoPagedResultDto();
        result.init(json);
        return result;
    }
}
