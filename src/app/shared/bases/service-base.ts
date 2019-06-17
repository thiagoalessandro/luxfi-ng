import { RequestErrorException } from "../exceptions/request-error-exception";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

const headerDefault = {
  "Content-Type": "application/json",
  Authorization: "my-auth-token"
};

export abstract class ServiceBase<T> {
  private httpClient: HttpClient;
  private serviceName: string;

  public initService(serviceName: string, httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.serviceName = serviceName;
  }

  private getApiHost(): String {
    return environment.apiHost;
  }

  public getlist(
    filter: Array<string>,
    pageNumber: number,
    pageSize: number
  ): Promise<Array<T>> {
    let params = new Array<string>();
    params["page"] = pageNumber;
    params["count"] = pageSize;
    for (var i in filter) {
      params[i] = filter[i];
    }
    return this.get(params);
  }
  public getAll(): Promise<Array<T>> {
    return this.get(null);
  }
  public get<T>(params): Promise<Array<T>> {
    return this.sendRequest(this.getApiHostService(), "get", null, params).then(
      response => this.handleResponse(response)
    );
  }
  public post<T>(body): Promise<T> {
    return this.sendRequest(this.getApiHostService(), "post", body, null).then(
      response => this.handleResponse(response)
    );
  }
  public patch<T>(body): Promise<T> {
    return this.sendRequest(this.getApiHostService(), "patch", body).then(
      response => this.handleResponse(response)
    );
  }
  public delete(id: number): Promise<void> {
    return this.sendRequest(
      `${this.getApiHostService()}/${id}`,
      "delete",
      null
    ).then(response => this.handleResponse(response));
  }
  private sendRequest(
    url: string,
    type: string,
    body: any,
    paramsOptions: Array<string> = null
  ): Promise<any> {
    var httpOptions;
    let httpParams = new HttpParams();

    if (paramsOptions != null) {
      for (let key in paramsOptions) {
        httpParams = httpParams.append(key, paramsOptions[key]);
      }
    }

    httpOptions = {
      headers: new HttpHeaders(headerDefault),
      params: httpParams
    };

    if (type == "get" || type == "delete") {
      return this.httpClient[type]<T>(url, httpOptions)
        .toPromise()
        .catch(e => this.handleError(e));
    } else if (type == "post" || type == "put") {
      return this.httpClient[type]<T>(url, body, httpOptions)
        .toPromise()
        .catch(e => this.handleError(e));
    }
  }

  private getApiHostService() {
    return `${this.getApiHost()}/${this.serviceName}`;
  }

  private handleResponse(response: any): any {
    var errors: Array<string>;
    if (response["errors"]) {
      errors = response["errors"];
      if (errors.length) {
        return Promise.reject(
          new RequestErrorException(this.refineMessage(response["errors"]))
        );
      }
    }
    return response["data"];
  }

  private handleError(e: Error): any {
    console.log(e.message);
    var messageError: string = e.message;
    if (e.message.search("unknown url")) {
      messageError = "Sem conexão com o servidor";
    }
    return Promise.reject(new Error(messageError));
  }

  private refineMessage(message: Array<string>): string {
    return message.join(";");
  }
}
