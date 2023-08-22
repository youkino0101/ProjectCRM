export interface IPermissionDto {
    id: number;
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
}

export class PermissionDto implements IPermissionDto {
    id: number;
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;

    constructor(data?: IPermissionDto) {
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
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): PermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new PermissionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        return data;
    }

    clone(): PermissionDto {
        const json = this.toJSON();
        let result = new PermissionDto();
        result.init(json);
        return result;
    }
}

