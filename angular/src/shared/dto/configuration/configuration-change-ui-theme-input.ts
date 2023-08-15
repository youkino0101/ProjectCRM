export class ChangeUiThemeInput implements IChangeUiThemeInput {
    theme: string;

    constructor(data?: IChangeUiThemeInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.theme = _data["theme"];
        }
    }

    static fromJS(data: any): ChangeUiThemeInput {
        data = typeof data === 'object' ? data : {};
        let result = new ChangeUiThemeInput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["theme"] = this.theme;
        return data;
    }

    clone(): ChangeUiThemeInput {
        const json = this.toJSON();
        let result = new ChangeUiThemeInput();
        result.init(json);
        return result;
    }
}

export interface IChangeUiThemeInput {
    theme: string;
}