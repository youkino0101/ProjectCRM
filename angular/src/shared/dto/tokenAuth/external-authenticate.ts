export interface IExternalAuthenticateModel {
    authProvider: string;
    providerKey: string;
    providerAccessCode: string;
}

export class ExternalAuthenticateModel implements IExternalAuthenticateModel {
    authProvider: string;
    providerKey: string;
    providerAccessCode: string;

    constructor(data?: IExternalAuthenticateModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.authProvider = _data["authProvider"];
            this.providerKey = _data["providerKey"];
            this.providerAccessCode = _data["providerAccessCode"];
        }
    }

    static fromJS(data: any): ExternalAuthenticateModel {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalAuthenticateModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["authProvider"] = this.authProvider;
        data["providerKey"] = this.providerKey;
        data["providerAccessCode"] = this.providerAccessCode;
        return data;
    }

    clone(): ExternalAuthenticateModel {
        const json = this.toJSON();
        let result = new ExternalAuthenticateModel();
        result.init(json);
        return result;
    }
}

