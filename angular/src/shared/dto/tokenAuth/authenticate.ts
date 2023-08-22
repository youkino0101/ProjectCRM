export interface IAuthenticateModel {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient: boolean;
}

export class AuthenticateModel implements IAuthenticateModel {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient: boolean;

    constructor(data?: IAuthenticateModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.userNameOrEmailAddress = _data["userNameOrEmailAddress"];
            this.password = _data["password"];
            this.rememberClient = _data["rememberClient"];
        }
    }

    static fromJS(data: any): AuthenticateModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
        data["password"] = this.password;
        data["rememberClient"] = this.rememberClient;
        return data;
    }

    clone(): AuthenticateModel {
        const json = this.toJSON();
        let result = new AuthenticateModel();
        result.init(json);
        return result;
    }
}

