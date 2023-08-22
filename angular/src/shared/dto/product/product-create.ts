export interface IProductCreateDto {
    id: number;
    productCode: string;
    productName: string;
    pathImage: string | undefined;
    quantity: number;
    price: number;
    description: string | undefined;
    category: string;
    trademark: string | undefined;
    status: string;
}

export class ProductCreateDto implements IProductCreateDto {
    id: number;
    productCode: string;
    productName: string;
    pathImage: string | undefined;
    quantity: number;
    price: number;
    description: string | undefined;
    category: string;
    trademark: string | undefined;
    status: string;

    constructor(data?: IProductCreateDto) {
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
        }
    }

    static fromJS(data: any): ProductCreateDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductCreateDto();
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
        return data;
    }

    clone(): ProductCreateDto {
        const json = this.toJSON();
        let result = new ProductCreateDto();
        result.init(json);
        return result;
    }
}
