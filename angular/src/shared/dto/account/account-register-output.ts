export interface IRegisterOutput {
    canLogin: boolean;
}

export class RegisterOutput implements IRegisterOutput {
    canLogin: boolean;

    constructor(data?: IRegisterOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.canLogin = _data["canLogin"];
        }
    }

    static fromJS(data: any): RegisterOutput {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["canLogin"] = this.canLogin;
        return data;
    }

    clone(): RegisterOutput {
        const json = this.toJSON();
        let result = new RegisterOutput();
        result.init(json);
        return result;
    }
}

