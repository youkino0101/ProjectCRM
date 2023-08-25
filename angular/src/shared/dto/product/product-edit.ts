export class ProductEditDto  {
    id: number;
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

    constructor(data?: ProductEditDto) {
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
            this.file = _data["file"];
            this.quantity = _data["quantity"];
            this.price = _data["price"];
            this.description = _data["description"];
            this.category = _data["category"];
            this.trademark = _data["trademark"];
            this.status = _data["status"];
        }
    }
}
