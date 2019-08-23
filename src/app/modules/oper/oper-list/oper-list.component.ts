import {ActivatedRoute, Router} from '@angular/router';
import {DialogConfirmService} from '../../../shared/components/dialog-confirm/dialog-confirm.service';
import {SegOperacaoService} from '../../../shared/services/seg-operacao.service';
import {Component} from '@angular/core';
import {SegOperacaoModel} from 'src/app/shared/models/seg-operacao.model';
import {FormBuilder, Validators} from '@angular/forms';
import {ListBase} from 'src/app/shared/bases/list-base';
import {MatDialog} from '@angular/material';
import {Location} from '@angular/common';

@Component({
  selector: 'app-oper-list',
  templateUrl: './oper-list.component.html',
  styleUrls: ['./oper-list.component.scss']
})
export class OperListComponent extends ListBase<SegOperacaoModel, SegOperacaoService> {

  constructor(segOperacoesService: SegOperacaoService,
              dialog: MatDialog,
              dialogConfirmService: DialogConfirmService,
              formBuilder: FormBuilder,
              router: Router,
              location: Location,
              route: ActivatedRoute
  ) {
    super(segOperacoesService,
      dialog,
      dialogConfirmService,
      formBuilder,
      router,
      location,
      route);
  }

  onInit(): void {
    this.initTableDataSource();
  }

  public newFormData() {
    this.addFormControl('nome', null, [Validators.required]);
  }

  public getFieldFilter(): Array<string> {
    return ['nome'];
  }

  public getColumns(): Array<string> {
    const columns:  Array<string> = [];
    columns['id'] = 'Id';
    columns['nome'] = 'Nome';
    columns['descricao'] = 'Descrição';
    columns['dh_atu'] = 'Data/Hora Atualização';
    columns['usu_atu'] = 'Usuário de Atualização';
    return columns;
  }

  public getGenerateValidatorAttributes(): boolean {
    return false;
  }

}
