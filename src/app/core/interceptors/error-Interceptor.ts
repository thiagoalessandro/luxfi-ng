import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {MessagesProduce} from '../produces/messagesProduce';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            this.authenticationService.logout();
            location.reload(true);
          } else if (err.status === 403) {
            this.router.navigate(['/home']);
          }
          this.handlerErrorResponse(err);
          return throwError(err);
        })
      );
  }

  public handlerErrorResponse(error) {
    if (error.error.errors === undefined) {
      switch (error.status) {
        case 400:
          MessagesProduce.publish('Credenciais inválidas');
          break;
        case 403:
          MessagesProduce.publish('Acesso não autorizado');
          break;
        case 401:
          MessagesProduce.publish('Acesso não autorizado');
          break;
        case 0:
          if (error.statusText.search('Unknown Error') !== -1) {
            MessagesProduce.publish('Ocorreu um erro inesperado!');
          }
          break;
        case undefined:
          MessagesProduce.publish('Ocorreu um erro inesperado!');
          break;
      }
    } else {
      MessagesProduce.publish(this.refineMessage(error.error.errors));
    }
  }

  private refineMessage(message: Array<string>): string {
    return message.join(';');
  }

}
