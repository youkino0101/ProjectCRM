export interface IDashboardDto {
    totalOrder: number;
    totalRevenue: number;
    totalProductSold: number;
    mostSoldProduct: string;
    totalProductsInStock: number;
    totalProductsSold: number;
    productsBelowMinimum: number;
    mostSoldProductInfo: string;
}

export class DashboardDto implements IDashboardDto {
    totalOrder: number;
    totalRevenue: number;
    totalProductSold: number;
    mostSoldProduct: string;
    totalProductsInStock: number;
    totalProductsSold: number;
    productsBelowMinimum: number;
    mostSoldProductInfo: string;

    constructor(data?: IDashboardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.totalOrder = _data["totalOrder"];
            this.totalRevenue = _data["totalRevenue"];
            this.totalProductSold = _data["totalProductSold"];
            this.mostSoldProduct = _data["mostSoldProduct"];
            this.totalProductsInStock = _data["totalProductsInStock"];
            this.totalProductsSold = _data["totalProductsSold"];
            this.productsBelowMinimum = _data["productsBelowMinimum"];
            this.mostSoldProductInfo = _data["mostSoldProductInfo"];
        }
    }

    static fromJS(data: any): DashboardDto {
        data = typeof data === 'object' ? data : {};
        let result = new DashboardDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalOrder"] = this.totalOrder;
        data["totalRevenue"] = this.totalRevenue;
        data["totalProductSold"] = this.totalProductSold;
        data["mostSoldProduct"] = this.mostSoldProduct;
        data["totalProductsInStock"] = this.totalProductsInStock;
        data["totalProductsSold"] = this.totalProductsSold;
        data["productsBelowMinimum"] = this.productsBelowMinimum;
        data["mostSoldProductInfo"] = this.mostSoldProductInfo;
        return data;
    }

    clone(): DashboardDto {
        const json = this.toJSON();
        let result = new DashboardDto();
        result.init(json);
        return result;
    }
}
