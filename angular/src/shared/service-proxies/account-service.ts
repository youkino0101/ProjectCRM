import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class AccountServiceProxy {
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
    isTenantAvailable(body: IsTenantAvailableInput | undefined): Observable<IsTenantAvailableOutput> {
        let url_ = this.baseUrl + "/api/services/app/Account/IsTenantAvailable";
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
            return this.processIsTenantAvailable(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processIsTenantAvailable(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<IsTenantAvailableOutput>;
                }
            } else
                return _observableThrow(response_) as any as Observable<IsTenantAvailableOutput>;
        }));
    }

    protected processIsTenantAvailable(response: HttpResponseBase): Observable<IsTenantAvailableOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = IsTenantAvailableOutput.fromJS(resultData200);
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
    register(body: RegisterInput | undefined): Observable<RegisterOutput> {
        let url_ = this.baseUrl + "/api/services/app/Account/Register";
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
            return this.processRegister(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processRegister(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<RegisterOutput>;
                }
            } else
                return _observableThrow(response_) as any as Observable<RegisterOutput>;
        }));
    }

    protected processRegister(response: HttpResponseBase): Observable<RegisterOutput> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = RegisterOutput.fromJS(resultData200);
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

export class RegisterInput implements IRegisterInput {
    name: string;
    surname: string;
    userName: string;
    emailAddress: string;
    password: string;
    captchaResponse: string | undefined;

    constructor(data?: IRegisterInput) {
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
            this.surname = _data["surname"];
            this.userName = _data["userName"];
            this.emailAddress = _data["emailAddress"];
            this.password = _data["password"];
            this.captchaResponse = _data["captchaResponse"];
        }
    }

    static fromJS(data: any): RegisterInput {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterInput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["userName"] = this.userName;
        data["emailAddress"] = this.emailAddress;
        data["password"] = this.password;
        data["captchaResponse"] = this.captchaResponse;
        return data;
    }

    clone(): RegisterInput {
        const json = this.toJSON();
        let result = new RegisterInput();
        result.init(json);
        return result;
    }
}

export interface IRegisterInput {
    name: string;
    surname: string;
    userName: string;
    emailAddress: string;
    password: string;
    captchaResponse: string | undefined;
}


export class RegisterOutput implements IRegisterOutput {
    canLogin: boolean;

    constructor(data?: IRegisterOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.canLogin = _data["canLogin"];
        }
    }

    static fromJS(data: any): RegisterOutput {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["canLogin"] = this.canLogin;
        return data;
    }

    clone(): RegisterOutput {
        const json = this.toJSON();
        let result = new RegisterOutput();
        result.init(json);
        return result;
    }
}

export interface IRegisterOutput {
    canLogin: boolean;
}

export class IsTenantAvailableInput implements IIsTenantAvailableInput {
    tenancyName: string;

    constructor(data?: IIsTenantAvailableInput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.tenancyName = _data["tenancyName"];
        }
    }

    static fromJS(data: any): IsTenantAvailableInput {
        data = typeof data === 'object' ? data : {};
        let result = new IsTenantAvailableInput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tenancyName"] = this.tenancyName;
        return data;
    }

    clone(): IsTenantAvailableInput {
        const json = this.toJSON();
        let result = new IsTenantAvailableInput();
        result.init(json);
        return result;
    }
}

export interface IIsTenantAvailableInput {
    tenancyName: string;
}

export class IsTenantAvailableOutput implements IIsTenantAvailableOutput {
    state: TenantAvailabilityState;
    tenantId: number | undefined;

    constructor(data?: IIsTenantAvailableOutput) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.state = _data["state"];
            this.tenantId = _data["tenantId"];
        }
    }

    static fromJS(data: any): IsTenantAvailableOutput {
        data = typeof data === 'object' ? data : {};
        let result = new IsTenantAvailableOutput();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["state"] = this.state;
        data["tenantId"] = this.tenantId;
        return data;
    }

    clone(): IsTenantAvailableOutput {
        const json = this.toJSON();
        let result = new IsTenantAvailableOutput();
        result.init(json);
        return result;
    }
}

export interface IIsTenantAvailableOutput {
    state: TenantAvailabilityState;
    tenantId: number | undefined;
}

export enum TenantAvailabilityState {
    _1 = 1,
    _2 = 2,
    _3 = 3,
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