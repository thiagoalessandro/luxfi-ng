import {SegMenuModel} from '../../shared/models/seg-menu.model';
import {Component, OnInit, Input, EventEmitter, HostBinding} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Router} from '@angular/router';
import {SegSubMenuModel} from 'src/app/shared/models/seg-sub-menu.model';
import {NavService} from '../services/nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {

  private expanded: boolean;

  @Input() menu: SegMenuModel;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(public router: Router) {
  }

  ngOnInit() {
    NavService.currentUrlSubject.subscribe(url => {
      const pathSplit = NavService.getSplitPath(url);
      if (pathSplit.length === 2) {
        this.expanded = this.menu.listSubMenu.filter(submenu => submenu.funcionalidade.sigla.toLowerCase() === pathSplit[0]).length > 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  public onSubMenuSelected(menu: SegMenuModel, subMenu: SegSubMenuModel) {
    this.router.navigate([`/${subMenu.funcionalidade.sigla.toLowerCase()}`]);
  }

  public onMenuSelected(menu: SegMenuModel) {
    this.expanded = !this.expanded;
  }

  public menuActive(menu: SegMenuModel): boolean {
    var result: boolean = false;
    NavService.currentUrlSubject.subscribe(url => {
      const pathSplit = NavService.getSplitPath(url);
      menu.listSubMenu.filter(submenu => {
        if (`${submenu.funcionalidade.sigla.toLowerCase()}` === pathSplit[0]) {
          result = true;
        }
      });
    });
    return result;
  }

  public subMenuActive(menu: SegMenuModel, subMenu: SegSubMenuModel): boolean {
    var result: boolean = false;
    NavService.currentUrlSubject.subscribe(url => {
      const pathSplit = NavService.getSplitPath(url);
      result = (subMenu.funcionalidade.sigla === pathSplit[0]);
    });
    return result;
  }

}
