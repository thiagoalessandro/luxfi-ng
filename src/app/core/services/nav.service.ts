import {Event, NavigationEnd, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {SegMenuModel} from '../../shared/models/seg-menu.model';

@Injectable({
  providedIn: 'root'
})
export class NavService{

  static currentUrlSubject = new BehaviorSubject<string>(undefined);

  static listMenu = new BehaviorSubject<SegMenuModel[]>(undefined);

  constructor(router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects !== undefined) {
          NavService.currentUrlSubject.next(event.urlAfterRedirects);
        }
      }
    });
  }

  public static getSplitPath(value: string): string[] {
    const url = new String(value);
    return url
      .split('/')
      .filter(result => result !== '');
  }
}
