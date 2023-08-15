import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
//dto
import { GetCurrentLoginInformationsOutput} from '@shared/dto/session/session-login-info-out'
import * as GeneralApi from '@shared/dto/common/general-api'

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

@Injectable()
export class SessionServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    getCurrentLoginInformations(): Observable<GetCurrentLoginInformationsOutput> {
        let url_ = this.baseUrl + "/api/services/app/Session/GetCurrentLoginInformations";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetCurrentLoginInformations(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCurrentLoginInformations(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCurrentLoginInformationsOutput>;
                }
            } else
                return _observableThrow(response_) as any as Observable<GetCurrentLoginInformationsOutput>;
        }));
    }

    protected processGetCurrentLoginInformations(response: HttpResponseBase): Observable<GetCurrentLoginInformationsOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return GeneralApi.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetCurrentLoginInformationsOutput.fromJS(resultData200);
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