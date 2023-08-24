export interface IProductDto {
    id: number;
    productCode: string;
    productName: string;
    pathImage: string | undefined;
    quantity: number;
    price: number;
    description: string | undefined;
    category: string;
    categoryName: string;
    trademark: string | undefined;
    status: string;
    statusName: string;
}

export class ProductDto implements IProductDto {
    id: number;
    productCode: string;
    productName: string;
    pathImage: string | undefined;
    quantity: number;
    price: number;
    description: string | undefined;
    category: string;
    categoryName: string;
    trademark: string | undefined;
    status: string;
    statusName: string;

    constructor(data?: IProductDto) {
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
            this.productCode = _data["productCode"];
            this.productName = _data["productName"];
            this.pathImage = _data["pathImage"];
            this.quantity = _data["quantity"];
            this.price = _data["price"];
            this.description = _data["description"];
            this.category = _data["category"];
            this.trademark = _data["trademark"];
            this.status = _data["status"];
            this.categoryName = _data["categoryName"];
            this.statusName = _data["statusName"];
        }
    }

    static fromJS(data: any): ProductDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["productCode"] = this.productCode;
        data["productName"] = this.productName;
        data["pathImage"] = this.pathImage;
        data["quantity"] = this.quantity;
        data["price"] = this.price;
        data["description"] = this.description;
        data["category"] = this.category;
        data["trademark"] = this.trademark;
        data["status"] = this.status;
        data["categoryName"] = this.categoryName;
        data["statusName"] = this.statusName;
        return data;
    }

    clone(): ProductDto {
        const json = this.toJSON();
        let result = new ProductDto();
        result.init(json);
        return result;
    }
}
