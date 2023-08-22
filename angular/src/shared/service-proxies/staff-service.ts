import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as GeneralApi from '@shared/dto/common/general-api'
import { StaffDto } from '@shared/dto/staff/staff'
import { StaffDtoPagedResultDto } from '@shared/dto/staff/staff-page'

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

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
    create(body: FormData | undefined): Observable<StaffDto> {
        let url_ = this.baseUrl + "/api/services/app/Staff/Create";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            body: body,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
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
                    return _observableThrow(e) as any as Observable<StaffDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<StaffDto>;
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<StaffDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = StaffDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return GeneralApi.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

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
    //         return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         let result200: any = null;
    //         let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
    //         result200 = RoleListDtoListResultDto.fromJS(resultData200);
    //         return _observableOf(result200);
    //         }));
    //     } else if (status !== 200 && status !== 204) {
    //         return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         return GeneralApi.throwException("An unexpected server error occurred.", status, _responseText, _headers);
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
    //         return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         let result200: any = null;
    //         let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
    //         result200 = RoleDto.fromJS(resultData200);
    //         return _observableOf(result200);
    //         }));
    //     } else if (status !== 200 && status !== 204) {
    //         return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
    //         return GeneralApi.throwException("An unexpected server error occurred.", status, _responseText, _headers);
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
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = StaffDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return GeneralApi.throwException("An unexpected server error occurred.", status, _responseText, _headers);
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
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = StaffDtoPagedResultDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return GeneralApi.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}