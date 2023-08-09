import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class StaffServiceProxy {
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
    // create(body: CreateRoleDto | undefined): Observable<RoleDto> {
    //     let url_ = this.baseUrl + "/api/services/app/Role/Create";
    //     url_ = url_.replace(/[?&]$/, "");

    //     const content_ = JSON.stringify(body);

    //     let options_ : any = {
    //         body: content_,
    //         observe: "response",
    //         responseType: "blob",
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json-patch+json",
    //             "Accept": "text/plain"
    //         })
    //     };

    //     return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
    //         return this.processCreate(response_);
    //     })).pipe(_observableCatch((response_: any) => {
    //         if (response_ instanceof HttpResponseBase) {
    //             try {
    //                 return this.processCreate(response_ as any);
    //             } catch (e) {
    //                 return _observableThrow(e) as any as Observable<RoleDto>;
    //             }
    //         } else
    //             return _observableThrow(response_) as any as Observable<RoleDto>;
    //     }));
    // }

    // protected processCreate(response: HttpResponseBase): Observable<RoleDto> {
    //     const status = response.status;
    //     const responseBlob =
    //         response instanceof HttpResponse ? response.body :
    //         (response as any).error instanceof Blob ? (response as any).error : undefined;

    //     let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
    //     if (status === 200) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         let result200: any = null;
    //         let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
    //         result200 = RoleDto.fromJS(resultData200);
    //         return _observableOf(result200);
    //         }));
    //     } else if (status !== 200 && status !== 204) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    //         }));
    //     }
    //     return _observableOf(null as any);
    // }

    // /**
    //  * @param permission (optional) 
    //  * @return Success
    //  */
    // getRoles(permission: string | undefined): Observable<RoleListDtoListResultDto> {
    //     let url_ = this.baseUrl + "/api/services/app/Role/GetRoles?";
    //     if (permission === null)
    //         throw new Error("The parameter 'permission' cannot be null.");
    //     else if (permission !== undefined)
    //         url_ += "Permission=" + encodeURIComponent("" + permission) + "&";
    //     url_ = url_.replace(/[?&]$/, "");

    //     let options_ : any = {
    //         observe: "response",
    //         responseType: "blob",
    //         headers: new HttpHeaders({
    //             "Accept": "text/plain"
    //         })
    //     };

    //     return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
    //         return this.processGetRoles(response_);
    //     })).pipe(_observableCatch((response_: any) => {
    //         if (response_ instanceof HttpResponseBase) {
    //             try {
    //                 return this.processGetRoles(response_ as any);
    //             } catch (e) {
    //                 return _observableThrow(e) as any as Observable<RoleListDtoListResultDto>;
    //             }
    //         } else
    //             return _observableThrow(response_) as any as Observable<RoleListDtoListResultDto>;
    //     }));
    // }

    // protected processGetRoles(response: HttpResponseBase): Observable<RoleListDtoListResultDto> {
    //     const status = response.status;
    //     const responseBlob =
    //         response instanceof HttpResponse ? response.body :
    //         (response as any).error instanceof Blob ? (response as any).error : undefined;

    //     let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
    //     if (status === 200) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         let result200: any = null;
    //         let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
    //         result200 = RoleListDtoListResultDto.fromJS(resultData200);
    //         return _observableOf(result200);
    //         }));
    //     } else if (status !== 200 && status !== 204) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    //         }));
    //     }
    //     return _observableOf(null as any);
    // }

    // /**
    //  * @param body (optional) 
    //  * @return Success
    //  */
    // update(body: RoleDto | undefined): Observable<RoleDto> {
    //     let url_ = this.baseUrl + "/api/services/app/Role/Update";
    //     url_ = url_.replace(/[?&]$/, "");

    //     const content_ = JSON.stringify(body);

    //     let options_ : any = {
    //         body: content_,
    //         observe: "response",
    //         responseType: "blob",
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json-patch+json",
    //             "Accept": "text/plain"
    //         })
    //     };

    //     return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
    //         return this.processUpdate(response_);
    //     })).pipe(_observableCatch((response_: any) => {
    //         if (response_ instanceof HttpResponseBase) {
    //             try {
    //                 return this.processUpdate(response_ as any);
    //             } catch (e) {
    //                 return _observableThrow(e) as any as Observable<RoleDto>;
    //             }
    //         } else
    //             return _observableThrow(response_) as any as Observable<RoleDto>;
    //     }));
    // }

    // protected processUpdate(response: HttpResponseBase): Observable<RoleDto> {
    //     const status = response.status;
    //     const responseBlob =
    //         response instanceof HttpResponse ? response.body :
    //         (response as any).error instanceof Blob ? (response as any).error : undefined;

    //     let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
    //     if (status === 200) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         let result200: any = null;
    //         let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
    //         result200 = RoleDto.fromJS(resultData200);
    //         return _observableOf(result200);
    //         }));
    //     } else if (status !== 200 && status !== 204) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    //         }));
    //     }
    //     return _observableOf(null as any);
    // }
    // }

    /**
     * @param id (optional) 
     * @return Success
     */
    get(id: number | undefined): Observable<StaffDto> {
        let url_ = this.baseUrl + "/api/services/app/Staff/Get?";
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
                    return _observableThrow(e) as any as Observable<StaffDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<StaffDto>;
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<StaffDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = StaffDto.fromJS(resultData200);
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
    getAll(keyword: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<StaffDtoPagedResultDto> {
        let url_ = this.baseUrl + "/api/services/app/Staff/GetAll?";
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
                    return _observableThrow(e) as any as Observable<StaffDtoPagedResultDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<StaffDtoPagedResultDto>;
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<StaffDtoPagedResultDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = StaffDtoPagedResultDto.fromJS(resultData200);
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

export interface IStaffDto {
    id: number;
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: moment.Moment;
    address: string;
    avatarImage: string;
    staffStatus: number;
    creationTime : moment.Moment;
}

export class StaffDto implements IStaffDto {
    id: number;
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: moment.Moment;
    address: string;
    avatarImage: string;
    staffStatus: number;
    creationTime : moment.Moment;

    constructor(data?: IStaffDto) {
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
            this.staffCode = _data["staffCode"];
            this.staffName = _data["staffName"];
            this.phoneNumber = _data["phoneNumber"];
            this.email = _data["email"];
            this.birthDate = _data["birthDate"] ? moment(_data["birthDate"].toString()) : <any>undefined;
            this.address = _data["address"];
            this.avatarImage = _data["avatarImage"];
            this.staffStatus = _data["staffStatus"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): StaffDto {
        data = typeof data === 'object' ? data : {};
        let result = new StaffDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["staffCode"] = this.staffCode;
        data["staffName"] = this.staffName;
        data["phoneNumber"] = this.phoneNumber;
        data["email"] = this.email;
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        data["address"] = this.address;
        data["avatarImage"] = this.avatarImage;
        data["staffStatus"] = this.staffStatus;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        return data;
    }

    clone(): StaffDto {
        const json = this.toJSON();
        let result = new StaffDto();
        result.init(json);
        return result;
    }
}

export interface IStaffDtoPagedResultDto {
    items: StaffDto[] | undefined;
    totalCount: number;
}

export class StaffDtoPagedResultDto implements IStaffDtoPagedResultDto {
    items: StaffDto[] | undefined;
    totalCount: number;

    constructor(data?: StaffDtoPagedResultDto) {
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
                    this.items.push(StaffDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): StaffDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StaffDtoPagedResultDto();
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

    clone(): StaffDtoPagedResultDto {
        const json = this.toJSON();
        let result = new StaffDtoPagedResultDto();
        result.init(json);
        return result;
    }
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