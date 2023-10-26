import { ProductDto } from "./product";

export interface IProductDtoSearchDto {
    items: ProductDto[] | undefined;
}

export class ProductDtoSearchDto implements IProductDtoSearchDto {
    items: ProductDto[] | undefined;

    constructor(data?: IProductDtoSearchDto) {
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
                    this.items.push(ProductDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ProductDtoSearchDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductDtoSearchDto();
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

    clone(): ProductDtoSearchDto {
        const json = this.toJSON();
        let result = new ProductDtoSearchDto();
        result.init(json);
        return result;
    }
}
