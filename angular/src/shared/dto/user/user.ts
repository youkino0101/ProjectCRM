import * as moment from 'moment';

export interface IUserDto {
    id: number;
    userName: string;
    name: string;
    surname: string;
    emailAddress: string;
    isActive: boolean;
    fullName: string | undefined;
    lastLoginTime: moment.Moment | undefined;
    creationTime: moment.Moment;
    roleNames: string[] | undefined;
}

export class UserDto implements IUserDto {
    id: number;
    userName: string;
    name: string;
    surname: string;
    emailAddress: string;
    isActive: boolean;
    fullName: string | undefined;
    lastLoginTime: moment.Moment | undefined;
    creationTime: moment.Moment;
    roleNames: string[] | undefined;

    constructor(data?: IUserDto) {
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
            this.userName = _data["userName"];
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.emailAddress = _data["emailAddress"];
            this.isActive = _data["isActive"];
            this.fullName = _data["fullName"];
            this.lastLoginTime = _data["lastLoginTime"] ? moment(_data["lastLoginTime"].toString()) : <any>undefined;
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
            if (Array.isArray(_data["roleNames"])) {
                this.roleNames = [] as any;
                for (let item of _data["roleNames"])
                    this.roleNames.push(item);
            }
        }
    }

    static fromJS(data: any): UserDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userName"] = this.userName;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;
        data["isActive"] = this.isActive;
        data["fullName"] = this.fullName;
        data["lastLoginTime"] = this.lastLoginTime ? this.lastLoginTime.toISOString() : <any>undefined;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        if (Array.isArray(this.roleNames)) {
            data["roleNames"] = [];
            for (let item of this.roleNames)
                data["roleNames"].push(item);
        }
        return data;
    }

    clone(): UserDto {
        const json = this.toJSON();
        let result = new UserDto();
        result.init(json);
        return result;
    }
}
