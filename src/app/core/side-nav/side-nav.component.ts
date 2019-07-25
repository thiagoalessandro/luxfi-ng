import {RouterAnimation} from '../animations/router.animation';
import {Router, RouterOutlet} from '@angular/router';
import {MatSidenav} from '@angular/material';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../services/nav.service';
import {SegMenuModel} from 'src/app/shared/models/seg-menu.model';
import {CommomBase} from 'src/app/shared/bases/commom-base';
import {AuthenticationService} from '../services/authentication.service';
import {UserAuthDto} from '../dto/user-auth.dto';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [RouterAnimation]
})
export class SideNavComponent extends CommomBase implements OnInit {
  menuItens: Array<SegMenuModel>;

  @ViewChild('snav')
  snav: MatSidenav;

  private nomeUsuario: string;
  private perfilUsuario: string;
  private logged: boolean;

  constructor(private navService: NavService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    super();
    this.authenticationService.currentUser.subscribe(userAuthDto => this.handlerSideNav(userAuthDto));
    NavService.listMenu.subscribe(listMenu => this.menuItens = listMenu);
  }

  public toggleAux() {
    this.snav.toggle();
  }

  ngOnInit() {
  }

  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  public handlerSideNav(userAuthDto: UserAuthDto) {
    this.loadMenu(userAuthDto);
    this.loadInfoUsuario(userAuthDto);
    this.logged = (userAuthDto != null);
  }

  public loadInfoUsuario(userAuthDto: UserAuthDto) {
    this.nomeUsuario = '';
    this.perfilUsuario = '';
    if (userAuthDto != null) {
      this.nomeUsuario = userAuthDto.nome.search(' ') === -1 ? userAuthDto.nome : userAuthDto.nome.split(' ')[0];
      this.perfilUsuario = userAuthDto.perfil;
    }
  }

  public loadMenu(userAuthDto: UserAuthDto) {
    NavService.listMenu.next(userAuthDto !== null ? userAuthDto.listMenu : undefined);
  }

  public logout() {
    this.authenticationService.logoutRedirect(this.router);
  }

}
