export interface IEditCustomerDto {
    id: number;
    codeCustomer: string;
    nameCustomer: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;
}

export class EditCustomerDto implements IEditCustomerDto {
    id: number;
    codeCustomer: string;
    nameCustomer: string;
    email: string;
    address: string;
    phoneNumber: string;
    status: string;

    constructor(data?: IEditCustomerDto) {
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
        }
    }

    static fromJS(data: any): EditCustomerDto {
        data = typeof data === 'object' ? data : {};
        let result = new EditCustomerDto();
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

    clone(): EditCustomerDto {
        const json = this.toJSON();
        let result = new EditCustomerDto();
        result.init(json);
        return result;
    }
}

