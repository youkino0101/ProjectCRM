import * as moment from 'moment';

export interface ILogDto {
    id: number;
    tenantId: number | undefined;
    userId: number;
    serviceName: string;
    methodName: string;
    parameters: string;
    returnValue: string | undefined;
    executionTime: moment.Moment;
    executionDuration: number;
    clientIpAddress: string;
    clientName: string | undefined;
    browserInfo: string;
    exceptionMessage: string;
    exception: string;
    impersonatorUserId: number | undefined;
    impersonatorTenantId: number | undefined;
}

export class LogDto implements ILogDto {
    id: number;
    tenantId: number | undefined;
    userId: number;
    serviceName: string;
    methodName: string;
    parameters: string;
    returnValue: string | undefined;
    executionTime: moment.Moment;
    executionDuration: number;
    clientIpAddress: string;
    clientName: string | undefined;
    browserInfo: string;
    exceptionMessage: string;
    exception: string;
    impersonatorUserId: number | undefined;
    impersonatorTenantId: number | undefined;

    constructor(data?: ILogDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.tenantId = _data["tenantId"];
            this.userId = _data["userId"];
            this.serviceName = _data["serviceName"];
            this.methodName = _data["methodName"];
            this.parameters = _data["parameters"];
            this.returnValue = _data["returnValue"];
            this.executionTime = _data["executionTime"] ? moment(_data["executionTime"].toString()) : <any>undefined;
            this.executionDuration = _data["executionDuration"];
            this.clientIpAddress = _data["clientIpAddress"];
            this.clientName = _data["clientName"];
            this.browserInfo = _data["browserInfo"];
            this.exceptionMessage = _data["exceptionMessage"];
            this.exception = _data["exception"];
            this.impersonatorUserId = _data["impersonatorUserId"];
            this.impersonatorTenantId = _data["impersonatorTenantId"];
        }
    }

    static fromJS(data: any): LogDto {
        data = typeof data === 'object' ? data : {};
        let result = new LogDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tenantId"] = this.tenantId;
        data["userId"] = this.userId;
        data["serviceName"] = this.serviceName;
        data["methodName"] = this.methodName;
        data["parameters"] = this.parameters;
        data["returnValue"] = this.returnValue;
        data["executionTime"] = this.executionTime ? this.executionTime.toISOString() : <any>undefined;
        data["executionDuration"] = this.executionDuration;
        data["clientIpAddress"] = this.clientIpAddress;
        data["clientName"] = this.clientName;
        data["browserInfo"] = this.browserInfo;
        data["exceptionMessage"] = this.exceptionMessage;
        data["exception"] = this.exception;
        data["impersonatorUserId"] = this.impersonatorUserId;
        data["impersonatorTenantId"] = this.impersonatorTenantId;
        return data;
    }

    clone(): LogDto {
        const json = this.toJSON();
        let result = new LogDto();
        result.init(json);
        return result;
    }
}
