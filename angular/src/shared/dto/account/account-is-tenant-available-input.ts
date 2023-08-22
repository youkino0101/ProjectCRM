export class IsTenantAvailableInput implements IIsTenantAvailableInput {
    tenancyName: string;

    constructor(data?: IIsTenantAvailableInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.tenancyName = _data["tenancyName"];
        }
    }

    static fromJS(data: any): IsTenantAvailableInput {
        data = typeof data === 'object' ? data : {};
        let result = new IsTenantAvailableInput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tenancyName"] = this.tenancyName;
        return data;
    }

    clone(): IsTenantAvailableInput {
        const json = this.toJSON();
        let result = new IsTenantAvailableInput();
        result.init(json);
        return result;
    }
}

export interface IIsTenantAvailableInput {
    tenancyName: string;
}