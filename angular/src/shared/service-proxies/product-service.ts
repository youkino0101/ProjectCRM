import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
// dto
import * as GeneralApi from '@shared/dto/common/general-api'
import { ProductDtoPagedResultDto } from '@shared/dto/product/product-page'

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { ProductDto } from '@shared/dto/product/product';

@Injectable()
export class ProductServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @param keyword (optional) 
     * @param skipCount (optional) 
     * @param maxResultCount (optional) 
     * @param status (optional) 
     * @param category (optional)
     * @return Success
     */
    getAll(keyword: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined, status: string | undefined, category: string | undefined): Observable<ProductDtoPagedResultDto> {
        let url_ = this.baseUrl + "/api/services/app/Product/GetAll?";
        if (keyword === null)
            throw new Error("The parameter 'keyword' cannot be null.");
        else if (keyword !== undefined)
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
        if (status === null)
            throw new Error("The parameter 'status' cannot be null.");
        else if (status !== undefined)
            url_ += "Status=" + encodeURIComponent("" + status) + "&";
        if (category === null)
            throw new Error("The parameter 'category' cannot be null.");
        else if (category !== undefined)
            url_ += "Category=" + encodeURIComponent("" + category) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<ProductDtoPagedResultDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<ProductDtoPagedResultDto>;
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<ProductDtoPagedResultDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ProductDtoPagedResultDto.fromJS(resultData200);
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
         * @param id (optional) 
         * @return Success
         */
    get(id: number | undefined): Observable<ProductDto> {
        let url_ = this.baseUrl + "/api/services/app/Product/Get?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<ProductDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<ProductDto>;
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ProductDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = ProductDto.fromJS(resultData200);
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
     * @param body (optional) 
     * @return Success
     */
    create(body: FormData | undefined): Observable<ProductDto> {
        let url_ = this.baseUrl + "/api/services/app/Product/Create";
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
                    return _observableThrow(e) as any as Observable<ProductDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<ProductDto>;
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<ProductDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = ProductDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return GeneralApi.throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    update(body: FormData | undefined): Observable<ProductDto> {
        let url_ = this.baseUrl + "/api/services/app/Product/Update";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            body: body,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
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
                    return _observableThrow(e) as any as Observable<ProductDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<ProductDto>;
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<ProductDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = ProductDto.fromJS(resultData200);
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