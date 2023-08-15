import { ApplicationInfoDto } from "./session-application";
import { TenantLoginInfoDto } from "./session-tenant-login";
import { UserLoginInfoDto } from "./session-user-login";

export interface IGetCurrentLoginInformationsOutput {
    application: ApplicationInfoDto;
    user: UserLoginInfoDto;
    tenant: TenantLoginInfoDto;
}

export class GetCurrentLoginInformationsOutput implements IGetCurrentLoginInformationsOutput {
    application: ApplicationInfoDto;
    user: UserLoginInfoDto;
    tenant: TenantLoginInfoDto;

    constructor(data?: IGetCurrentLoginInformationsOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.application = _data["application"] ? ApplicationInfoDto.fromJS(_data["application"]) : <any>undefined;
            this.user = _data["user"] ? UserLoginInfoDto.fromJS(_data["user"]) : <any>undefined;
            this.tenant = _data["tenant"] ? TenantLoginInfoDto.fromJS(_data["tenant"]) : <any>undefined;
        }
    }

    static fromJS(data: any): GetCurrentLoginInformationsOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCurrentLoginInformationsOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["application"] = this.application ? this.application.toJSON() : <any>undefined;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        data["tenant"] = this.tenant ? this.tenant.toJSON() : <any>undefined;
        return data;
    }

    clone(): GetCurrentLoginInformationsOutput {
        const json = this.toJSON();
        let result = new GetCurrentLoginInformationsOutput();
        result.init(json);
        return result;
    }
}

