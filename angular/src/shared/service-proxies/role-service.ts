import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { RoleDto } from '@shared/dto/role/role'

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class RoleServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    create(body: CreateRoleDto | undefined): Observable<RoleDto> {
        let url_ = this.baseUrl + "/api/services/app/Role/Create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RoleDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RoleDto>;
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<RoleDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RoleDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param permission (optional) 
     * @return Success
     */
    getRoles(permission: string | undefined): Observable<RoleListDtoListResultDto> {
        let url_ = this.baseUrl + "/api/services/app/Role/GetRoles?";
        if (permission === null)
            throw new Error("The parameter 'permission' cannot be null.");
        else if (permission !== undefined)
            url_ += "Permission=" + encodeURIComponent("" + permission) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetRoles(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetRoles(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RoleListDtoListResultDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RoleListDtoListResultDto>;
        }));
    }

    protected processGetRoles(response: HttpResponseBase): Observable<RoleListDtoListResultDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RoleListDtoListResultDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    update(body: RoleDto | undefined): Observable<RoleDto> {
        let url_ = this.baseUrl + "/api/services/app/Role/Update";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RoleDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RoleDto>;
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<RoleDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RoleDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Role/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return Success
     */
    getAllPermissions(): Observable<PermissionDtoListResultDto> {
        let url_ = this.baseUrl + "/api/services/app/Role/GetAllPermissions";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAllPermissions(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllPermissions(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PermissionDtoListResultDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<PermissionDtoListResultDto>;
        }));
    }

    protected processGetAllPermissions(response: HttpResponseBase): Observable<PermissionDtoListResultDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PermissionDtoListResultDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    getRoleForEdit(id: number | undefined): Observable<GetRoleForEditOutput> {
        let url_ = this.baseUrl + "/api/services/app/Role/GetRoleForEdit?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetRoleForEdit(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetRoleForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetRoleForEditOutput>;
                }
            } else
                return _observableThrow(response_) as any as Observable<GetRoleForEditOutput>;
        }));
    }

    protected processGetRoleForEdit(response: HttpResponseBase): Observable<GetRoleForEditOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetRoleForEditOutput.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    get(id: number | undefined): Observable<RoleDto> {
        let url_ = this.baseUrl + "/api/services/app/Role/Get?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RoleDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RoleDto>;
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<RoleDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RoleDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param keyword (optional) 
     * @param skipCount (optional) 
     * @param maxResultCount (optional) 
     * @return Success
     */
    getAll(keyword: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<RoleDtoPagedResultDto> {
        let url_ = this.baseUrl + "/api/services/app/Role/GetAll?";
        if (keyword === null)
            throw new Error("The parameter 'keyword' cannot be null.");
        else if (keyword !== undefined)
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RoleDtoPagedResultDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RoleDtoPagedResultDto>;
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<RoleDtoPagedResultDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RoleDtoPagedResultDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class CreateRoleDto implements ICreateRoleDto {
    name: string;
    displayName: string;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;

    constructor(data?: ICreateRoleDto) {
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
            this.normalizedName = _data["normalizedName"];
            this.description = _data["description"];
            if (Array.isArray(_data["grantedPermissions"])) {
                this.grantedPermissions = [] as any;
                for (let item of _data["grantedPermissions"])
                    this.grantedPermissions.push(item);
            }
        }
    }

    static fromJS(data: any): CreateRoleDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateRoleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
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

    clone(): CreateRoleDto {
        const json = this.toJSON();
        let result = new CreateRoleDto();
        result.init(json);
        return result;
    }
}

export interface ICreateRoleDto {
    name: string;
    displayName: string;
    normalizedName: string | undefined;
    description: string | undefined;
    grantedPermissions: string[] | undefined;
}






export class RoleDtoPagedResultDto implements IRoleDtoPagedResultDto {
    items: RoleDto[] | undefined;
    totalCount: number;

    constructor(data?: IRoleDtoPagedResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items.push(RoleDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): RoleDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleDtoPagedResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        data["totalCount"] = this.totalCount;
        return data;
    }

    clone(): RoleDtoPagedResultDto {
        const json = this.toJSON();
        let result = new RoleDtoPagedResultDto();
        result.init(json);
        return result;
    }
}

export interface IRoleDtoPagedResultDto {
    items: RoleDto[] | undefined;
    totalCount: number;
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

export interface IRoleEditDto {
    id: number;
    name: string;
    displayName: string;
    description: string | undefined;
    isStatic: boolean;
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

export interface IRoleListDto {
    id: number;
    name: string | undefined;
    displayName: string | undefined;
    isStatic: boolean;
    isDefault: boolean;
    creationTime: moment.Moment;
}

export class RoleListDtoListResultDto implements IRoleListDtoListResultDto {
    items: RoleListDto[] | undefined;

    constructor(data?: IRoleListDtoListResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items.push(RoleListDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RoleListDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RoleListDtoListResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }

    clone(): RoleListDtoListResultDto {
        const json = this.toJSON();
        let result = new RoleListDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface IRoleListDtoListResultDto {
    items: RoleListDto[] | undefined;
}

export class PermissionDtoListResultDto implements IPermissionDtoListResultDto {
    items: PermissionDto[] | undefined;

    constructor(data?: IPermissionDtoListResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items.push(PermissionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PermissionDtoListResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new PermissionDtoListResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }

    clone(): PermissionDtoListResultDto {
        const json = this.toJSON();
        let result = new PermissionDtoListResultDto();
        result.init(json);
        return result;
    }
}

export interface IPermissionDtoListResultDto {
    items: PermissionDto[] | undefined;
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

export interface IGetRoleForEditOutput {
    role: RoleEditDto;
    permissions: FlatPermissionDto[] | undefined;
    grantedPermissionNames: string[] | undefined;
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

export interface IFlatPermissionDto {
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

export interface IPermissionDto {
    id: number;
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}