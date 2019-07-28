import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {OauthService} from './oauth.service';
import {environment} from '../../../environments/environment';
import {UserAuthDto} from '../dto/user-auth.dto';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {ServiceApiBase} from '../../shared/bases/service-api-base';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ServiceApiBase<any> {

  private static pagesPermited: Array<string> = ['home'];

  private currentUserSubject: BehaviorSubject<UserAuthDto>;
  public currentUser: Observable<UserAuthDto>;

  constructor(private oAuthService: OauthService,
              httpClient: HttpClient) {
    super();
    this.initServiceResourceServer('auth', httpClient);
    this.currentUserSubject = new BehaviorSubject<UserAuthDto>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public currentUserValue(): UserAuthDto {
    return this.currentUserSubject.value;
  }

  public isAutenticated(): boolean {
    if (this.currentUserSubject.value) {
      return true;
    }
    return false;
  }

  public login(data: string, router: Router, url: string) {
    this.oAuthService.accessToken(data).subscribe(
      responseDataToken => {
        this.userAuthenticated(responseDataToken.access_token).subscribe(
          responseDataUserAuth => {
            responseDataUserAuth.tokenAccess = responseDataToken.access_token;
            this.saveAuthenticationUser(responseDataUserAuth);
            router.navigate([url]);
          });
      });
  }

  public saveAuthenticationUser(user: UserAuthDto) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public userAuthenticated(tokenAcess: string): Observable<UserAuthDto> {
    const headerOptions = new Array<string>();
    headerOptions['Authorization'] = `Bearer ${tokenAcess}`;
    return this.getByArrayParams(null, null, headerOptions).pipe(map(response => this.handlerResponse(response)));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public logoutRedirect(router: Router) {
    this.logout();
    router.navigate(['/login']);
  }

  public getGrantType(): string {
    return environment.grantType;
  }

  public isAcessoPermited(route: ActivatedRouteSnapshot): boolean {
    let permited = false;
    if (AuthenticationService.pagesPermited.find(pagePermited => route.routeConfig.path === pagePermited)) {
      permited = true;
    } else {
      this.currentUserValue().listMenu.forEach(menu => {
        menu.listSubMenu.forEach(subMenu => {
          subMenu.funcionalidade.listFuncionalidadeOperacao.forEach(segFuncionalidadeOperacao => {
            if (subMenu.funcionalidade.sigla.toLowerCase() === route.parent.routeConfig.path
              && segFuncionalidadeOperacao.operacao.sigla.toLowerCase() === route.routeConfig.path) {
              permited = true;
            }
          });
        });
      });
    }
    return permited;
  }
}
