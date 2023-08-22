export interface ITenantLoginInfoDto {
    id: number;
    tenancyName: string | undefined;
    name: string | undefined;
}

export class TenantLoginInfoDto implements ITenantLoginInfoDto {
    id: number;
    tenancyName: string | undefined;
    name: string | undefined;

    constructor(data?: ITenantLoginInfoDto) {
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
            this.tenancyName = _data["tenancyName"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): TenantLoginInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new TenantLoginInfoDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tenancyName"] = this.tenancyName;
        data["name"] = this.name;
        return data;
    }

    clone(): TenantLoginInfoDto {
        const json = this.toJSON();
        let result = new TenantLoginInfoDto();
        result.init(json);
        return result;
    }
}

