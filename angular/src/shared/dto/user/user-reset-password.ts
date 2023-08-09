export interface IResetPasswordDto {
    adminPassword: string;
    userId: number;
    newPassword: string;
}

export class ResetPasswordDto implements IResetPasswordDto {
    adminPassword: string;
    userId: number;
    newPassword: string;

    constructor(data?: IResetPasswordDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.adminPassword = _data["adminPassword"];
            this.userId = _data["userId"];
            this.newPassword = _data["newPassword"];
        }
    }

    static fromJS(data: any): ResetPasswordDto {
        data = typeof data === 'object' ? data : {};
        let result = new ResetPasswordDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["adminPassword"] = this.adminPassword;
        data["userId"] = this.userId;
        data["newPassword"] = this.newPassword;
        return data;
    }

    clone(): ResetPasswordDto {
        const json = this.toJSON();
        let result = new ResetPasswordDto();
        result.init(json);
        return result;
    }
}
