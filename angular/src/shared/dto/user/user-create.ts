export interface ICreateUserDto {
    userName: string;
    name: string;
    surname: string;
    emailAddress: string;
    isActive: boolean;
    roleNames: string[] | undefined;
    password: string;
}

export class CreateUserDto implements ICreateUserDto {
    userName: string;
    name: string;
    surname: string;
    emailAddress: string;
    isActive: boolean;
    roleNames: string[] | undefined;
    password: string;

    constructor(data?: ICreateUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.userName = _data["userName"];
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.emailAddress = _data["emailAddress"];
            this.isActive = _data["isActive"];
            if (Array.isArray(_data["roleNames"])) {
                this.roleNames = [] as any;
                for (let item of _data["roleNames"])
                    this.roleNames.push(item);
            }
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): CreateUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateUserDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userName"] = this.userName;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;
        data["isActive"] = this.isActive;
        if (Array.isArray(this.roleNames)) {
            data["roleNames"] = [];
            for (let item of this.roleNames)
                data["roleNames"].push(item);
        }
        data["password"] = this.password;
        return data;
    }

    clone(): CreateUserDto {
        const json = this.toJSON();
        let result = new CreateUserDto();
        result.init(json);
        return result;
    }
}

