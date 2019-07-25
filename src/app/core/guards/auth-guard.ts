import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MessagesProduce} from '../produces/messagesProduce';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isAutenticated()) {
      if (state.url.search('login') !== -1) {
        this.router.navigate(['/home']);
        return false;
      }
      if (!this.authenticationService.isAcessoPermited(route)) {
        MessagesProduce.publish('Acesso não autorizado');
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
