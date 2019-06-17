import { SideNavComponent } from "./core/side-nav/side-nav.component";
import { SegMenuModel } from "./shared/models/seg-menu.model";
import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  EventEmitter,
  AfterViewInit
} from "@angular/core";

import { NavService } from "./core/services/nav.service";
import { RouterOutlet } from "@angular/router";
import { RouterAnimation } from "./core/animations/router.animation";
import { MatSidenav, MatSnackBar } from "@angular/material";
import { CommomBase } from "./shared/bases/commom-base";
import { ViewChildren } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private currentUser: string;

  @ViewChild(SideNavComponent)
  sideNavComponent: SideNavComponent;

  ngOnInit(): void {}
}
