import {NavService} from '../../../core/services/nav.service';
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {SegFuncionalidadeOperacaoModel} from '../../models/seg-funcionalidade-operacao.model';
import {SegOperacaoModel} from '../../models/seg-operacao.model';
import {SegMenuModel} from '../../models/seg-menu.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {


  @Output() responseAction = new EventEmitter();

  private listOptions: SegFuncionalidadeOperacaoModel[] = [];

  private rotaFuncionalidade: string;

  @Input() private itemsSelected: Array<any> = [];

  constructor(private router: Router) {
    NavService.listMenu.subscribe(listMenu => {
      if (listMenu !== undefined) {
        this.loadOptions(listMenu);
      }
    });
  }

  public reciverEvent(operacao: string) {
    const acao = operacao.replace(' ', '_').toUpperCase();
    this.responseAction.emit(acao);
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

  public disabledOption(operacao: SegOperacaoModel) {
    let multipleIdSelected: boolean = false;
    if (operacao.singleSelect) {
      if (this.itemsSelected != null && this.itemsSelected.length > 1) {
        multipleIdSelected = true;
      }
    }
    if (operacao.enable) {
      return false;
    } else {
      return ((this.itemsSelected.length === 0) || multipleIdSelected);
    }
  }

  public navigateTo(operacao: SegOperacaoModel) {
    if (operacao.immediateAction) {
      this.reciverEvent(operacao.nome);
    } else {
      if (operacao.dataId) {
        this.router.navigate(
          ['/'.concat(this.rotaFuncionalidade).concat('/').concat(operacao.sigla.toLowerCase())],
          {queryParams: {id: this.itemsSelected[0].id}});
      } else {
        this.router.navigate(
          ['/'.concat(this.rotaFuncionalidade).concat('/').concat(operacao.sigla.toLowerCase())]);
      }
    }
  }

}
