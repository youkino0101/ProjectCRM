

export interface IStaffDto {
    id: number;
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    address: string;
    staffStatus: string;
    staffStatusName: string;
    creationTime : string;
    userId: number;
}

export class StaffDto implements IStaffDto {
    id: number;
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    address: string;
    staffStatus: string;
    staffStatusName: string;
    creationTime : string;
    userId: number;

    constructor(data?: IStaffDto) {
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
            this.staffCode = _data["staffCode"];
            this.staffName = _data["staffName"];
            this.phoneNumber = _data["phoneNumber"];
            this.email = _data["email"];
            this.birthDate = _data["birthDate"];
            this.address = _data["address"];
            this.staffStatus = _data["staffStatus"];
            this.staffStatusName = _data["staffStatusName"];
            this.creationTime = _data["creationTime"];
            this.userId = _data["userId"];
        }
    }

    static fromJS(data: any): StaffDto {
        data = typeof data === 'object' ? data : {};
        let result = new StaffDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["staffCode"] = this.staffCode;
        data["staffName"] = this.staffName;
        data["phoneNumber"] = this.phoneNumber;
        data["email"] = this.email;
        data["birthDate"] = this.birthDate ;
        data["address"] = this.address;
        data["staffStatus"] = this.staffStatus;
        data["staffStatusName"] = this.staffStatusName;
        data["creationTime"] = this.creationTime ;
        data["userId"] = this.userId ;
        return data;
    }

    clone(): StaffDto {
        const json = this.toJSON();
        let result = new StaffDto();
        result.init(json);
        return result;
    }
}