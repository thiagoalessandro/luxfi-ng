import {BreadCrumb} from '../../models/binding/breadcrumb';
import {Router} from '@angular/router';
import {NavService} from '../../../core/services/nav.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SegMenuModel} from '../../models/seg-menu.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  private itens: string[] = [];
  private home: boolean;

  private listMenu: SegMenuModel[];

  @Output()
  private eventBreadcrumb: EventEmitter<BreadCrumb> = new EventEmitter<BreadCrumb>();

  constructor(private router: Router) {
    this.home = true;
  }

  ngOnInit(): void {
    NavService.listMenu.subscribe(listMenu => {
      if (listMenu !== undefined) {
        this.loadItens(listMenu);
      }
    });
  }

  loadBreadCrumb(): void {
    let breadCrumb: BreadCrumb = new BreadCrumb();
    breadCrumb.function = this.itens[1];
    breadCrumb.operation = this.itens[2];
    breadCrumb.icon = this.itens[3];
    this.eventBreadcrumb.emit(breadCrumb);
  }


  public loadItens(listMenu: SegMenuModel[]): void {
    var breadCrumb: BreadCrumb;
    var pathSplit = NavService.getSplitPath(this.router.url);
    if (pathSplit.length === 2) {
      listMenu.filter(menu => menu.listSubMenu.filter(submenu => {
        if (`${submenu.funcionalidade.sigla.toLowerCase()}` === pathSplit[0]) {
          this.itens.push(menu.nome);
          this.itens.push(submenu.funcionalidade.nome);
          this.home = false;
          return true;
        }
      }).filter(submenu => {
        submenu.funcionalidade.listFuncionalidadeOperacao.filter(funcOperacao => {
          if (pathSplit[1].search(funcOperacao.operacao.sigla.toLowerCase()) !== -1) {
            this.itens.push(funcOperacao.operacao.nome);
            this.itens.push(funcOperacao.operacao.icone);
            this.loadBreadCrumb();
            return true;
          }
        });
      }));
    } else {
      this.itens.push('Home');
    }

  }
}
