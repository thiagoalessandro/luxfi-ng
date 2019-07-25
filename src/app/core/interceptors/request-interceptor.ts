import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authenticationService.isAutenticated() && !this.isAuthorization(request)) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.authenticationService.currentUserValue().tokenAccess}`
        }
      });
    }

    return next.handle(request);
  }

  private isAuthorization(request: HttpRequest<any>): boolean {
    try {
      if (request.headers.get('Authorization') != null) {
        return true;
      }
    } catch (e) {
      console.log();
    }
    return false;
  }
}
