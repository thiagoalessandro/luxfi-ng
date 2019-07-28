import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export abstract class ServiceBase<T> {

  private httpClient: HttpClient;
  private serviceName: string;
  private context: string;

  public initServiceResourceServer(serviceName: string, httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.serviceName = serviceName;
    this.context = this.getContextResourceServer();
  }

  public initServiceAuthorizationServer(serviceName: string, httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.serviceName = serviceName;
    this.context = this.getContextAuthorizationServer();
  }

  private getUrlWs(): string {
    return environment.urlWs;
  }

  private getContextResourceServer(): string {
    return environment.contextResourceServer;
  }

  private getContextAuthorizationServer(): string {
    return environment.contextAuthorizationServer;
  }

  public getContentTypeRequestWs(): string {
    return environment.contentTypeRequestWs;
  }

  public getByArrayParams(path: string, optionsParams: Array<string>, optionsHeaders: Array<string>): Observable<any> {
    return this.get(path,
      this.parseArrayToHttpParams(optionsParams),
      this.parseArrayToHttpHeaders(optionsHeaders));
  }

  public get(path: string, optionsParams: HttpParams, httpHeaders: HttpHeaders): Observable<any> {
    let url = this.getApiHostService();
    if (path != null) {
      url = url.concat('/').concat(path);
    }
    return this.sendRequest(url,
      'get',
      null,
      optionsParams,
      httpHeaders);
  }

  public post(body: any, httpParams: HttpParams, httpHeaders: HttpHeaders): Observable<any> {
    return this.sendRequest(this.getApiHostService(),
      'post',
      body,
      httpParams,
      httpHeaders);

  }

  public patch(body: any): Observable<any> {
    return this.sendRequest(this.getApiHostService(),
      'patch',
      body,
      null,
      null)
      .pipe(
        map(data => this.handlerResponse(data))
      );
  }

  public delete(id: number): Observable<any> {
    return this.sendRequest(
      `${this.getApiHostService()}/${id}`,
      'delete',
      null,
      null,
      null);
  }

  public postFormDataHeaders(body: any, optionsHeaders: Array<string>): Observable<any> {
    if (optionsHeaders == null) {
      optionsHeaders = new Array<string>();
    }
    optionsHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    return this.post(this.parseObjectToHttpParams(body),
      null,
      this.parseArrayToHttpHeaders(optionsHeaders));
  }

  private sendRequest(
    url: string,
    type: string,
    body: any,
    httpParams: HttpParams,
    httpHeaders: HttpHeaders
  ): Observable<any> {
    const httpOptions = {
      headers: httpHeaders,
      params: httpParams
    };

    if (type === 'get' || type === 'delete') {
      return this.httpClient[type]<any>(url, httpOptions);
    } else if (type === 'post' || type === 'put') {
      return this.httpClient[type]<any>(url, body, httpOptions);
    }
  }

  public parseArrayToHttpHeaders(optionsHeaders: Array<string>): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    if (optionsHeaders != null) {
      for (const key in optionsHeaders) {
        httpHeaders = httpHeaders.append(key, optionsHeaders[key]);
      }
    }
    return httpHeaders;
  }

  public parseArrayToHttpParams(optionsParams: Array<string>): HttpParams {
    let httpParams = new HttpParams();
    if (optionsParams != null) {
      for (const key in optionsParams) {
        httpParams = httpParams.append(key, optionsParams[key]);
      }
    }
    return httpParams;
  }

  public parseObjectToHttpParams(object: Object): HttpParams {
    let httpParams = new HttpParams();
    if (object != null) {
      Object.keys(object).map(function (key) {
        httpParams = httpParams.append(key, object[key]);
      });
    }
    return httpParams;
  }

  private getApiHostService() {
    return `${this.getUrlWs()}/${this.context}/${this.serviceName}`;
  }

  public handlerResponse(response): any {
    return response['data'];
  }

}
