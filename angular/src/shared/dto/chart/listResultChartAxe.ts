import { ChartAxeDto } from "./chartAxe";

export interface IListChartAxe {
    items: ChartAxeDto[] | undefined;
}

export class ListChartAxe implements IListChartAxe {
    items: ChartAxeDto[] | undefined;

    constructor(data?: IListChartAxe) {
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
                    this.items.push(ChartAxeDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ListChartAxe {
        data = typeof data === 'object' ? data : {};
        let result = new ListChartAxe();
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

    clone(): ListChartAxe {
        const json = this.toJSON();
        let result = new ListChartAxe();
        result.init(json);
        return result;
    }
}
