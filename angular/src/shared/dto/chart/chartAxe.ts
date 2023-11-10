export interface IChartAxeDto {
    month: string;
    orderCount: number;
    totalAmount: number;
}

export class ChartAxeDto implements IChartAxeDto {
    month: string;
    orderCount: number;
    totalAmount: number;

    constructor(data?: IChartAxeDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.month = _data["month"];
            this.orderCount = _data["orderCount"];
            this.totalAmount = _data["totalAmount"];
        }
    }

    static fromJS(data: any): ChartAxeDto {
        data = typeof data === 'object' ? data : {};
        let result = new ChartAxeDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["month"] = this.month;
        data["orderCount"] = this.orderCount;
        data["totalAmount"] = this.totalAmount;
        return data;
    }

    clone(): ChartAxeDto {
        const json = this.toJSON();
        let result = new ChartAxeDto();
        result.init(json);
        return result;
    }
}
