export class ProductCreateDto  {
    productCode: string;
    productName: string;
    pathImage: string | undefined;
    file: File | undefined;
    quantity: string;
    price: string;
    description: string | undefined;
    category: string;
    trademark: string | undefined;
    status: string;

    constructor(data?: ProductCreateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}
