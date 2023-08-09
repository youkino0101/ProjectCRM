export interface IChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}

export class ChangePasswordDto implements IChangePasswordDto {
    currentPassword: string;
    newPassword: string;

    constructor(data?: IChangePasswordDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.currentPassword = _data["currentPassword"];
            this.newPassword = _data["newPassword"];
        }
    }

    static fromJS(data: any): ChangePasswordDto {
        data = typeof data === 'object' ? data : {};
        let result = new ChangePasswordDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["currentPassword"] = this.currentPassword;
        data["newPassword"] = this.newPassword;
        return data;
    }

    clone(): ChangePasswordDto {
        const json = this.toJSON();
        let result = new ChangePasswordDto();
        result.init(json);
        return result;
    }
}
