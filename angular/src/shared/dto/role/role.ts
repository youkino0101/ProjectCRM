
export interface IRoleDto {
    id: number;
    name: string;
    displayName: string;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;
}

export class RoleDto implements IRoleDto {
    id: number;
    name: string;
    displayName: string;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;

    constructor(data?: IRoleDto) {
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
            this.normalizedName = _data["normalizedName"];
            this.description = _data["description"];
            if (Array.isArray(_data["grantedPermissions"])) {
                this.grantedPermissions = [] as any;
                for (let item of _data["grantedPermissions"])
                    this.grantedPermissions.push(item);
            }
        }
    }

    static fromJS(data: any): RoleDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["normalizedName"] = this.normalizedName;
        data["description"] = this.description;
        if (Array.isArray(this.grantedPermissions)) {
            data["grantedPermissions"] = [];
            for (let item of this.grantedPermissions)
                data["grantedPermissions"].push(item);
        }
        return data;
    }

    clone(): RoleDto {
        const json = this.toJSON();
        let result = new RoleDto();
        result.init(json);
        return result;
    }
}
