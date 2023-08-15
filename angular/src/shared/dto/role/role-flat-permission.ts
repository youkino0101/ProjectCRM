export interface IFlatPermissionDto {
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
}

export class FlatPermissionDto implements IFlatPermissionDto {
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;

    constructor(data?: IFlatPermissionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.displayName = _data["displayName"];
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): FlatPermissionDto {
        data = typeof data === 'object' ? data : {};
        let result = new FlatPermissionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        return data;
    }

    clone(): FlatPermissionDto {
        const json = this.toJSON();
        let result = new FlatPermissionDto();
        result.init(json);
        return result;
    }
}

