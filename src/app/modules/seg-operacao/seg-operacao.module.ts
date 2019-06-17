import { SegOperacoesRoutingModule as SegOperacaoRoutingModule } from './seg-operacao-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { SegOperacaoListComponent } from './seg-operacao-list/seg-operacao-list.component';
import { SegOperacaoCadAltComponent } from './seg-operacao-cad-alt/seg-operacao-cad-alt.component';

@NgModule({
  declarations: [SegOperacaoCadAltComponent, 
                 SegOperacaoListComponent],
  imports: [
    SharedModule,
    SegOperacaoRoutingModule
  ]
})
export class SegOperacaoModule { }
