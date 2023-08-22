export interface IRegisterInput {
    name: string;
    surname: string;
    userName: string;
    emailAddress: string;
    password: string;
    captchaResponse: string | undefined;
}

export class RegisterInput implements IRegisterInput {
    name: string;
    surname: string;
    userName: string;
    emailAddress: string;
    password: string;
    captchaResponse: string | undefined;

    constructor(data?: IRegisterInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.userName = _data["userName"];
            this.emailAddress = _data["emailAddress"];
            this.password = _data["password"];
            this.captchaResponse = _data["captchaResponse"];
        }
    }

    static fromJS(data: any): RegisterInput {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterInput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["userName"] = this.userName;
        data["emailAddress"] = this.emailAddress;
        data["password"] = this.password;
        data["captchaResponse"] = this.captchaResponse;
        return data;
    }

    clone(): RegisterInput {
        const json = this.toJSON();
        let result = new RegisterInput();
        result.init(json);
        return result;
    }
}
