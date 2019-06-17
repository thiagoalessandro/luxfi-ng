import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from "@angular/core";
import { MatSidenav } from "@angular/material";
import { SideNavComponent } from "../side-nav/side-nav.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  @Input()
  sideNavComponent: SideNavComponent;

  ngOnInit() {}
}
