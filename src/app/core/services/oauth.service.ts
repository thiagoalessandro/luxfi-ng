import {ServiceBase} from 'src/app/shared/bases/service-base';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OauthTokenDto} from '../dto/oauth-token.dto';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OauthService extends ServiceBase<any> {

  constructor(httpClient: HttpClient) {
    super();
    this.initServiceAuthorizationServer('token', httpClient);
  }

  public accessToken(body: any): Observable<OauthTokenDto> {
    const headerOptions = new Array<string>();
    headerOptions['Authorization'] = `Basic ${this.getAuthorizationClient()}`;
    return this.postFormDataHeaders(body, headerOptions);
  }

  private getAuthorizationClient(): string {
    return environment.authorizationClient;
  }

}
