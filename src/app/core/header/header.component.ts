import {Component, Input, OnInit} from '@angular/core';
import {SideNavComponent} from '../side-nav/side-nav.component';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {logger} from 'codelyzer/util/logger';
import {UserAuthDto} from '../dto/user-auth.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.authenticationService.currentUser.subscribe(userAuthDto => this.handlerTopBar(userAuthDto));
  }

  @Input()
  sideNavComponent: SideNavComponent;

  private logged: boolean;

  ngOnInit() {
  }

  public logout() {
    this.authenticationService.logoutRedirect(this.router);
  }

  public handlerTopBar(userAuthDto: UserAuthDto) {
    this.logged = (userAuthDto != null);
  }

}
