import { HeaderComponent } from "./../header/header.component";
import { RouterAnimation } from "../animations/router.animation";
import { RouterOutlet } from "@angular/router";
import { MatSidenav, MatSnackBar } from "@angular/material";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { NavService } from "../services/nav.service";
import { SegMenuModel } from "src/app/shared/models/seg-menu.model";
import { CommomBase } from "src/app/shared/bases/commom-base";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"],
  animations: [RouterAnimation]
})
export class SideNavComponent extends CommomBase implements OnInit {
  menuItens: Array<SegMenuModel>;

  @ViewChild("snav")
  snav: MatSidenav;

  constructor(private navService: NavService, snackBar: MatSnackBar) {
    super(snackBar);
    this.getAllMenu();
  }

  public toggleAux() {
    this.snav.toggle();
  }

  ngOnInit() {}

  public getAllMenu(): void {
    this.navService
      .getAll()
      .then(data => this.loadMenu(data))
      .catch(e => this.handleError(e));
  }

  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  public loadMenu(listMenu: SegMenuModel[]) {
    this.menuItens = listMenu;
    NavService.listMenu.next(listMenu);
  }
}
