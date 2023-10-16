export interface ICreateCustomerDto {
    codeCustomer: string;
    nameCustomer: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;
}

export class CreateCustomerDto implements ICreateCustomerDto {
    codeCustomer: string;
    nameCustomer: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;

    constructor(data?: ICreateCustomerDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.codeCustomer = _data["codeCustomer"];
            this.nameCustomer = _data["nameCustomer"];
            this.email = _data["email"];
            this.address = _data["address"];
            this.phoneNumber = _data["phoneNumber"];
            this.status = _data["status"];
        }
    }

    static fromJS(data: any): CreateCustomerDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateCustomerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["codeCustomer"] = this.codeCustomer;
        data["nameCustomer"] = this.nameCustomer;
        data["email"] = this.email;
        data["address"] = this.address;
        data["phoneNumber"] = this.phoneNumber;
        data["status"] = this.status;
        return data;
    }

    clone(): CreateCustomerDto {
        const json = this.toJSON();
        let result = new CreateCustomerDto();
        result.init(json);
        return result;
    }
}

