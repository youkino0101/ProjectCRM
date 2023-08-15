export interface IExternalAuthenticateResultModel {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number;
    waitingForActivation: boolean;
}

export class ExternalAuthenticateResultModel implements IExternalAuthenticateResultModel {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number;
    waitingForActivation: boolean;

    constructor(data?: IExternalAuthenticateResultModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.accessToken = _data["accessToken"];
            this.encryptedAccessToken = _data["encryptedAccessToken"];
            this.expireInSeconds = _data["expireInSeconds"];
            this.waitingForActivation = _data["waitingForActivation"];
        }
    }

    static fromJS(data: any): ExternalAuthenticateResultModel {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalAuthenticateResultModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["encryptedAccessToken"] = this.encryptedAccessToken;
        data["expireInSeconds"] = this.expireInSeconds;
        data["waitingForActivation"] = this.waitingForActivation;
        return data;
    }

    clone(): ExternalAuthenticateResultModel {
        const json = this.toJSON();
        let result = new ExternalAuthenticateResultModel();
        result.init(json);
        return result;
    }
}

