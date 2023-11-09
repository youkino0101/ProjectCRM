export interface ISelectDto {
    id: number;
    text: string | undefined;
}


export class SelectDto implements ISelectDto {
    id: number;
    text: string | undefined;
    
    constructor(data?: ISelectDto) {
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
            this.text = _data["text"];
        }
    }

    static fromJS(data: any): SelectDto {
        data = typeof data === 'object' ? data : {};
        let result = new SelectDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        return data;
    }

    clone(): SelectDto {
        const json = this.toJSON();
        let result = new SelectDto();
        result.init(json);
        return result;
    }
}
