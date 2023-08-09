import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

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
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetCurrentLoginInformationsOutput.fromJS(resultData200);
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

export class GetCurrentLoginInformationsOutput implements IGetCurrentLoginInformationsOutput {
    application: ApplicationInfoDto;
    user: UserLoginInfoDto;
    tenant: TenantLoginInfoDto;

    constructor(data?: IGetCurrentLoginInformationsOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.application = _data["application"] ? ApplicationInfoDto.fromJS(_data["application"]) : <any>undefined;
            this.user = _data["user"] ? UserLoginInfoDto.fromJS(_data["user"]) : <any>undefined;
            this.tenant = _data["tenant"] ? TenantLoginInfoDto.fromJS(_data["tenant"]) : <any>undefined;
        }
    }

    static fromJS(data: any): GetCurrentLoginInformationsOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCurrentLoginInformationsOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["application"] = this.application ? this.application.toJSON() : <any>undefined;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        data["tenant"] = this.tenant ? this.tenant.toJSON() : <any>undefined;
        return data;
    }

    clone(): GetCurrentLoginInformationsOutput {
        const json = this.toJSON();
        let result = new GetCurrentLoginInformationsOutput();
        result.init(json);
        return result;
    }
}

export interface IGetCurrentLoginInformationsOutput {
    application: ApplicationInfoDto;
    user: UserLoginInfoDto;
    tenant: TenantLoginInfoDto;
}

export class TenantLoginInfoDto implements ITenantLoginInfoDto {
    id: number;
    tenancyName: string | undefined;
    name: string | undefined;

    constructor(data?: ITenantLoginInfoDto) {
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
            this.tenancyName = _data["tenancyName"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): TenantLoginInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new TenantLoginInfoDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tenancyName"] = this.tenancyName;
        data["name"] = this.name;
        return data;
    }

    clone(): TenantLoginInfoDto {
        const json = this.toJSON();
        let result = new TenantLoginInfoDto();
        result.init(json);
        return result;
    }
}

export interface ITenantLoginInfoDto {
    id: number;
    tenancyName: string | undefined;
    name: string | undefined;
}

export class UserLoginInfoDto implements IUserLoginInfoDto {
    id: number;
    name: string | undefined;
    surname: string | undefined;
    userName: string | undefined;
    emailAddress: string | undefined;

    constructor(data?: IUserLoginInfoDto) {
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
            this.surname = _data["surname"];
            this.userName = _data["userName"];
            this.emailAddress = _data["emailAddress"];
        }
    }

    static fromJS(data: any): UserLoginInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserLoginInfoDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["userName"] = this.userName;
        data["emailAddress"] = this.emailAddress;
        return data;
    }

    clone(): UserLoginInfoDto {
        const json = this.toJSON();
        let result = new UserLoginInfoDto();
        result.init(json);
        return result;
    }
}

export interface IUserLoginInfoDto {
    id: number;
    name: string | undefined;
    surname: string | undefined;
    userName: string | undefined;
    emailAddress: string | undefined;
}

export class ApplicationInfoDto implements IApplicationInfoDto {
    version: string | undefined;
    releaseDate: moment.Moment;
    features: { [key: string]: boolean; } | undefined;

    constructor(data?: IApplicationInfoDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.version = _data["version"];
            this.releaseDate = _data["releaseDate"] ? moment(_data["releaseDate"].toString()) : <any>undefined;
            if (_data["features"]) {
                this.features = {} as any;
                for (let key in _data["features"]) {
                    if (_data["features"].hasOwnProperty(key))
                        (<any>this.features)[key] = _data["features"][key];
                }
            }
        }
    }

    static fromJS(data: any): ApplicationInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new ApplicationInfoDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["version"] = this.version;
        data["releaseDate"] = this.releaseDate ? this.releaseDate.toISOString() : <any>undefined;
        if (this.features) {
            data["features"] = {};
            for (let key in this.features) {
                if (this.features.hasOwnProperty(key))
                    (<any>data["features"])[key] = (<any>this.features)[key];
            }
        }
        return data;
    }

    clone(): ApplicationInfoDto {
        const json = this.toJSON();
        let result = new ApplicationInfoDto();
        result.init(json);
        return result;
    }
}

export interface IApplicationInfoDto {
    version: string | undefined;
    releaseDate: moment.Moment;
    features: { [key: string]: boolean; } | undefined;
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