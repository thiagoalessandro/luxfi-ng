import { SideNavComponent } from "./side-nav/side-nav.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./../app-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { MenuListItemComponent } from "./menu-list-item/menu-list-item.component";
import { HeaderComponent } from "./header/header.component";
import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    HeaderComponent,
    MenuListItemComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    SideNavComponent
  ],
  imports: [SharedModule, BrowserAnimationsModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    MenuListItemComponent,
    FooterComponent,
    SideNavComponent
  ]
})
export class CoreModule {}
