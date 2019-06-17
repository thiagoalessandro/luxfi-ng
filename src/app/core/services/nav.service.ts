import { HttpClient } from "@angular/common/http";
import {
  Router,
  NavigationEnd,
  Event,
  Routes,
  RouterLinkWithHref
} from "@angular/router";
import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { SegMenuModel } from "../../shared/models/seg-menu.model";
import { ServiceBase } from "src/app/shared/bases/service-base";
import { StorageBase } from "src/app/shared/bases/storage-base";

@Injectable({
  providedIn: "root"
})
export class NavService extends ServiceBase<SegMenuModel> {
  static currentUrl = new BehaviorSubject<string>(undefined);

  static listMenu = new BehaviorSubject<SegMenuModel[]>(undefined);

  constructor(router: Router, httpClient: HttpClient) {
    super();

    this.initService("seg-menu", httpClient);

    // this.getAll().then(listSegMenuModel => {
    //   StorageBase.setItem('listSegMenuModel', listSegMenuModel);
    // })

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects != undefined) {
          NavService.currentUrl.next(event.urlAfterRedirects);
        }
      }
    });
  }

  public static getSplitPath(value: string): string[] {
    let url = new String(value);
    return url
      .split("/")
      .filter(result => result !== "")
      .map(result => `/${result}`);
  }
}
