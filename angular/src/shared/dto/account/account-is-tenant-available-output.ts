export interface IIsTenantAvailableOutput {
    state: TenantAvailabilityState;
    tenantId: number | undefined;
}

export enum TenantAvailabilityState {
    _1 = 1,
    _2 = 2,
    _3 = 3,
}

export class IsTenantAvailableOutput implements IIsTenantAvailableOutput {
    state: TenantAvailabilityState;
    tenantId: number | undefined;

    constructor(data?: IIsTenantAvailableOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.state = _data["state"];
            this.tenantId = _data["tenantId"];
        }
    }

    static fromJS(data: any): IsTenantAvailableOutput {
        data = typeof data === 'object' ? data : {};
        let result = new IsTenantAvailableOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["state"] = this.state;
        data["tenantId"] = this.tenantId;
        return data;
    }

    clone(): IsTenantAvailableOutput {
        const json = this.toJSON();
        let result = new IsTenantAvailableOutput();
        result.init(json);
        return result;
    }
}

