export interface IRoleEditDto {
    id: number;
    name: string;
    displayName: string;
    description: string | undefined;
    isStatic: boolean;
}

export class RoleEditDto implements IRoleEditDto {
    id: number;
    name: string;
    displayName: string;
    description: string | undefined;
    isStatic: boolean;

    constructor(data?: IRoleEditDto) {
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
            this.isStatic = _data["isStatic"];
        }
    }

    static fromJS(data: any): RoleEditDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleEditDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        data["isStatic"] = this.isStatic;
        return data;
    }

    clone(): RoleEditDto {
        const json = this.toJSON();
        let result = new RoleEditDto();
        result.init(json);
        return result;
    }
}

