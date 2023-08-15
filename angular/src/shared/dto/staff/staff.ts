import * as moment from 'moment';

export interface IStaffDto {
    id: number;
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: moment.Moment;
    address: string;
    staffStatus: number;
    creationTime : moment.Moment;
}

export class StaffDto implements IStaffDto {
    id: number;
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: moment.Moment;
    address: string;
    staffStatus: number;
    creationTime : moment.Moment;

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
            this.birthDate = _data["birthDate"] ? moment(_data["birthDate"].toString()) : <any>undefined;
            this.address = _data["address"];
            this.staffStatus = _data["staffStatus"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
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
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        data["address"] = this.address;
        data["staffStatus"] = this.staffStatus;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        return data;
    }

    clone(): StaffDto {
        const json = this.toJSON();
        let result = new StaffDto();
        result.init(json);
        return result;
    }
}