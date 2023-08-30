export interface ICreateSupplierDto {
    supplierCode: string;
    supplierName: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;
}

export class CreateSupplierDto implements ICreateSupplierDto {
    supplierCode: string;
    supplierName: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;

    constructor(data?: ICreateSupplierDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.supplierCode = _data["supplierCode"];
            this.supplierName = _data["supplierName"];
            this.email = _data["email"];
            this.address = _data["address"];
            this.phoneNumber = _data["phoneNumber"];
            this.status = _data["status"];
        }
    }

    static fromJS(data: any): CreateSupplierDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateSupplierDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["supplierCode"] = this.supplierCode;
        data["supplierName"] = this.supplierName;
        data["email"] = this.email;
        data["address"] = this.address;
        data["phoneNumber"] = this.phoneNumber;
        data["status"] = this.status;
        return data;
    }

    clone(): CreateSupplierDto {
        const json = this.toJSON();
        let result = new CreateSupplierDto();
        result.init(json);
        return result;
    }
}

