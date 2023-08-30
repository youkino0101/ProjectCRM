export interface ISupplierDto {
    id: number;
    supplierCode: string;
    supplierName: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;
    statusName: string;
    creationTime: string;
}

export class SupplierDto implements ISupplierDto {
    id: number;
    supplierCode: string;
    supplierName: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;
    statusName: string;
    creationTime: string;

    constructor(data?: ISupplierDto) {
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
            this.supplierCode = _data["supplierCode"];
            this.supplierName = _data["supplierName"];
            this.email = _data["email"];
            this.address = _data["address"];
            this.phoneNumber = _data["phoneNumber"];
            this.status = _data["status"];
            this.statusName = _data["statusName"];
            this.creationTime = _data["creationTime"];
        }
    }

    static fromJS(data: any): SupplierDto {
        data = typeof data === 'object' ? data : {};
        let result = new SupplierDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["supplierCode"] = this.supplierCode;
        data["supplierName"] = this.supplierName;
        data["email"] = this.email;
        data["address"] = this.address;
        data["phoneNumber"] = this.phoneNumber;
        data["status"] = this.status;
        data["statusName"] = this.statusName;
        data["creationTime"] = this.creationTime;
        return data;
    }

    clone(): SupplierDto {
        const json = this.toJSON();
        let result = new SupplierDto();
        result.init(json);
        return result;
    }
}