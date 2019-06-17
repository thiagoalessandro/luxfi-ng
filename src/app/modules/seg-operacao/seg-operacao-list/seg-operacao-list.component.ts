import { Router } from '@angular/router';
import { DialogConfirmService } from '../../../shared/components/dialog-confirm/dialog-confirm.service';
import { SegOperacaoService } from '../../../shared/services/seg-operacao.service';
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { SegOperacaoModel } from 'src/app/shared/models/seg-operacao.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ListBase } from 'src/app/shared/bases/list-base';
import { ProgressSpinnerMode, MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-seg-operacao-list',
  templateUrl: './seg-operacao-list.component.html',
  styleUrls: ['./seg-operacao-list.component.scss']
})
export class SegOperacaoListComponent extends ListBase<SegOperacaoModel, SegOperacaoService> implements OnInit {

  constructor(segOperacoesService :SegOperacaoService,              
              snackBar: MatSnackBar, 
              dialog: MatDialog,
              dialogConfirmService: DialogConfirmService,
              formBuilder: FormBuilder,
              router: Router              
              ) { 
    super(segOperacoesService, 
          dialog, 
          dialogConfirmService, 
          snackBar, 
          formBuilder, 
          router);
  } 
headerDefault
  ngOnInit() {
    this.initTableDataSource();     
  }

  public initFormData(){
    this.addFormControl('nome', null, [Validators.required]);
  }

  public getFieldFilter(): Array<string>{
    return ['nome'];
  }

  public getFieldColumns(): Array<string>{
    return ['select', 'id', 'nome', 'descricao'];
  } 

}
