export interface IExternalLoginProviderInfoModel {
    name: string | undefined;
    clientId: string | undefined;
}

export class ExternalLoginProviderInfoModel implements IExternalLoginProviderInfoModel {
    name: string | undefined;
    clientId: string | undefined;

    constructor(data?: IExternalLoginProviderInfoModel) {
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
            this.clientId = _data["clientId"];
        }
    }

    static fromJS(data: any): ExternalLoginProviderInfoModel {
        data = typeof data === 'object' ? data : {};
        let result = new ExternalLoginProviderInfoModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["clientId"] = this.clientId;
        return data;
    }

    clone(): ExternalLoginProviderInfoModel {
        const json = this.toJSON();
        let result = new ExternalLoginProviderInfoModel();
        result.init(json);
        return result;
    }
}

