import { SegOperacaoService } from '../../../shared/services/seg-operacao.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormBase } from 'src/app/shared/bases/form-base';
import { SegOperacaoModel } from 'src/app/shared/models/seg-operacao.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seg-operacao-cad-alt',
  templateUrl: './seg-operacao-cad-alt.component.html',
  styleUrls: ['./seg-operacao-cad-alt.component.scss']
}) 
export class SegOperacaoCadAltComponent extends FormBase<SegOperacaoModel, SegOperacaoService> implements OnInit  {
    
  constructor(snackBar: MatSnackBar,
              formBuilder: FormBuilder, 
              segOperacoesService: SegOperacaoService,
              router: Router) { 
      super(snackBar, 
            formBuilder, 
            segOperacoesService, 
            router);
    }
    
    ngOnInit() {    
    }
    
    public initFormData() {
      this.addFormGroup(this.getFormGroupPost(), new SegOperacaoModel());
      this.addFormControlValidator(this.getFormGroupPost(), 'nome',[Validators.required]);
      this.addFormControlValidator(this.getFormGroupPost(), 'descricao',[Validators.required]);
    }
    
    public getFormGroupPost() {
      return 'operacao';
    }

}
