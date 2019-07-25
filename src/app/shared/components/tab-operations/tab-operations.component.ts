import {Router} from '@angular/router';
import {NavService} from '../../../core/services/nav.service';
import {Component, OnInit} from '@angular/core';
import {SegFuncionalidadeOperacaoModel} from '../../models/seg-funcionalidade-operacao.model';
import {SegMenuModel} from '../../models/seg-menu.model';

@Component({
  selector: 'app-tab-operations',
  templateUrl: './tab-operations.component.html',
  styleUrls: ['./tab-operations.component.scss']
})
export class TabOperationsComponent {

  private listOptions: SegFuncionalidadeOperacaoModel[] = [];

  private rotaFuncionalidade: string;

  constructor(private router: Router) {
    NavService.listMenu.subscribe(listMenu => {
      if (listMenu !== undefined) {
        this.loadOptions(listMenu);
      }
    });
  }

  public loadOptions(listMenu: SegMenuModel[]): void {
    var pathSplit = NavService.getSplitPath(this.router.url);
    if (pathSplit.length === 2) {
      this.rotaFuncionalidade = pathSplit[0];
      listMenu
        .filter(menu => menu.listSubMenu
          .filter(submenu => {
            if (`${submenu.funcionalidade.sigla.toLowerCase()}` === pathSplit[0]) {
              this.listOptions = submenu.funcionalidade.listFuncionalidadeOperacao
                .filter(funcionalidadeOperacao => funcionalidadeOperacao.menuPrincipal);
            }
          }));
    }
  }

}
