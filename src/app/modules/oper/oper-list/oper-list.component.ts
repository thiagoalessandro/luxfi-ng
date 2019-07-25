import {ActivatedRoute, Router} from '@angular/router';
import {DialogConfirmService} from '../../../shared/components/dialog-confirm/dialog-confirm.service';
import {SegOperacaoService} from '../../../shared/services/seg-operacao.service';
import {Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';
import {SegOperacaoModel} from 'src/app/shared/models/seg-operacao.model';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ListBase} from 'src/app/shared/bases/list-base';
import {ProgressSpinnerMode, MatSnackBar, MatDialog, MatDialogRef} from '@angular/material';
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

  public getFieldColumns(): Array<string> {
    return ['select', 'id', 'nome', 'descricao', 'dh_atu', 'usu_atu'];
  }

  public getGenerateValidatorAttributes(): boolean {
    return false;
  }

}
