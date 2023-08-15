import * as moment from 'moment';

export interface IRoleListDto {
    id: number;
    name: string | undefined;
    displayName: string | undefined;
    isStatic: boolean;
    isDefault: boolean;
    creationTime: moment.Moment;
}

export class RoleListDto implements IRoleListDto {
    id: number;
    name: string | undefined;
    displayName: string | undefined;
    isStatic: boolean;
    isDefault: boolean;
    creationTime: moment.Moment;

    constructor(data?: IRoleListDto) {
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
            this.name = _data["name"];
            this.displayName = _data["displayName"];
            this.isStatic = _data["isStatic"];
            this.isDefault = _data["isDefault"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): RoleListDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["isStatic"] = this.isStatic;
        data["isDefault"] = this.isDefault;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        return data;
    }

    clone(): RoleListDto {
        const json = this.toJSON();
        let result = new RoleListDto();
        result.init(json);
        return result;
    }
}

