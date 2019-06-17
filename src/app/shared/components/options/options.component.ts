import { NavService } from '../../../core/services/nav.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SegFuncionalidadeOperacaoModel } from '../../models/seg-funcionalidade-operacao.model';
import { SegOperacaoModel } from '../../models/seg-operacao.model';
import { SegMenuModel } from '../../models/seg-menu.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent{

  
  @Output() responseAction = new EventEmitter();
  
  private listOptions: SegFuncionalidadeOperacaoModel[] = [];
  
  private rotaFuncionalidade: string;
  
  @Input() private itemsSelected: Array<any> = []; 
  
  constructor(private router: Router) { 
    NavService.listMenu.subscribe(listMenu => {
      if(listMenu != undefined){    
        this.loadOptions(listMenu)
      }
    });
  }
  
  public reciverEvent(operacao: string){
    var acao = operacao.replace(' ','_').toUpperCase();
    this.responseAction.emit(acao);
  }

  public loadOptions(listMenu: SegMenuModel[]): void{  
    var pathSplit = NavService.getSplitPath(this.router.url);    
    if (pathSplit.length == 2) {        
        listMenu
        .filter(menu => menu.listSubMenu
          .filter(submenu => {
            if(`${submenu.funcionalidade.rota}` == pathSplit[0]){
              this.listOptions = submenu.funcionalidade.listFuncionalidadeOperacao
              .filter(funcionalidadeOperacao => !funcionalidadeOperacao.menuPrincipal);
            }
        }))
    }
  }

  public disabledOption(operacao: SegOperacaoModel) {
    if(operacao.nome.toUpperCase() == 'BUSCAR'){
      return false;
    }else{
      return this.itemsSelected.length == 0;
    }
  }

}
