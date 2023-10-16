export interface ICustomerDto {
    id: number;
    codeCustomer: string;
    nameCustomer: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;
    statusName: string;
    creationTime: string;
}

export class CustomerDto implements ICustomerDto {
    id: number;
    codeCustomer: string;
    nameCustomer: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;
    statusName: string;
    creationTime: string;

    constructor(data?: ICustomerDto) {
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
            this.codeCustomer = _data["codeCustomer"];
            this.nameCustomer = _data["nameCustomer"];
            this.email = _data["email"];
            this.address = _data["address"];
            this.phoneNumber = _data["phoneNumber"];
            this.status = _data["status"];
            this.statusName = _data["statusName"];
            this.creationTime = _data["creationTime"];
        }
    }

    static fromJS(data: any): CustomerDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["codeCustomer"] = this.codeCustomer;
        data["nameCustomer"] = this.nameCustomer;
        data["email"] = this.email;
        data["address"] = this.address;
        data["phoneNumber"] = this.phoneNumber;
        data["status"] = this.status;
        data["statusName"] = this.statusName;
        data["creationTime"] = this.creationTime;
        return data;
    }

    clone(): CustomerDto {
        const json = this.toJSON();
        let result = new CustomerDto();
        result.init(json);
        return result;
    }
}