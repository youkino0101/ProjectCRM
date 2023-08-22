export interface IChangeUserLanguageDto {
    languageName: string;
}

export class ChangeUserLanguageDto implements IChangeUserLanguageDto {
    languageName: string;

    constructor(data?: IChangeUserLanguageDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.languageName = _data["languageName"];
        }
    }

    static fromJS(data: any): ChangeUserLanguageDto {
        data = typeof data === 'object' ? data : {};
        let result = new ChangeUserLanguageDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["languageName"] = this.languageName;
        return data;
    }

    clone(): ChangeUserLanguageDto {
        const json = this.toJSON();
        let result = new ChangeUserLanguageDto();
        result.init(json);
        return result;
    }
}
