import { ServiceBase } from 'src/app/shared/bases/service-base';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SegOperacaoModel } from '../models/seg-operacao.model';

@Injectable({
  providedIn: 'root'
})

export class SegOperacaoService extends ServiceBase<SegOperacaoModel>{
  
  constructor(httpClient: HttpClient) { 
    super();
    this.initService('seg-operacao', httpClient);    
  }
  
}
