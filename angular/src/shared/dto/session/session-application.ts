import * as moment from 'moment';

export interface IApplicationInfoDto {
    version: string | undefined;
    releaseDate: moment.Moment;
    features: { [key: string]: boolean; } | undefined;
}

export class ApplicationInfoDto implements IApplicationInfoDto {
    version: string | undefined;
    releaseDate: moment.Moment;
    features: { [key: string]: boolean; } | undefined;

    constructor(data?: IApplicationInfoDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.version = _data["version"];
            this.releaseDate = _data["releaseDate"] ? moment(_data["releaseDate"].toString()) : <any>undefined;
            if (_data["features"]) {
                this.features = {} as any;
                for (let key in _data["features"]) {
                    if (_data["features"].hasOwnProperty(key))
                        (<any>this.features)[key] = _data["features"][key];
                }
            }
        }
    }

    static fromJS(data: any): ApplicationInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new ApplicationInfoDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["version"] = this.version;
        data["releaseDate"] = this.releaseDate ? this.releaseDate.toISOString() : <any>undefined;
        if (this.features) {
            data["features"] = {};
            for (let key in this.features) {
                if (this.features.hasOwnProperty(key))
                    (<any>data["features"])[key] = (<any>this.features)[key];
            }
        }
        return data;
    }

    clone(): ApplicationInfoDto {
        const json = this.toJSON();
        let result = new ApplicationInfoDto();
        result.init(json);
        return result;
    }
}

