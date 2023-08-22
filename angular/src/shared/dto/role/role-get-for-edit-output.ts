import { RoleEditDto} from './role-edit'
import { FlatPermissionDto} from './role-flat-permission'

export interface IGetRoleForEditOutput {
    role: RoleEditDto;
    permissions: FlatPermissionDto[] | undefined;
    grantedPermissionNames: string[] | undefined;
}

export class GetRoleForEditOutput implements IGetRoleForEditOutput {
    role: RoleEditDto;
    permissions: FlatPermissionDto[] | undefined;
    grantedPermissionNames: string[] | undefined;

    constructor(data?: IGetRoleForEditOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.role = _data["role"] ? RoleEditDto.fromJS(_data["role"]) : <any>undefined;
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [] as any;
                for (let item of _data["permissions"])
                    this.permissions.push(FlatPermissionDto.fromJS(item));
            }
            if (Array.isArray(_data["grantedPermissionNames"])) {
                this.grantedPermissionNames = [] as any;
                for (let item of _data["grantedPermissionNames"])
                    this.grantedPermissionNames.push(item);
            }
        }
    }

    static fromJS(data: any): GetRoleForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetRoleForEditOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["role"] = this.role ? this.role.toJSON() : <any>undefined;
        if (Array.isArray(this.permissions)) {
            data["permissions"] = [];
            for (let item of this.permissions)
                data["permissions"].push(item.toJSON());
        }
        if (Array.isArray(this.grantedPermissionNames)) {
            data["grantedPermissionNames"] = [];
            for (let item of this.grantedPermissionNames)
                data["grantedPermissionNames"].push(item);
        }
        return data;
    }

    clone(): GetRoleForEditOutput {
        const json = this.toJSON();
        let result = new GetRoleForEditOutput();
        result.init(json);
        return result;
    }
}

