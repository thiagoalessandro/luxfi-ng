import { SegOperacaoListComponent } from './seg-operacao-list/seg-operacao-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SegOperacaoCadAltComponent } from './seg-operacao-cad-alt/seg-operacao-cad-alt.component';

const routes: Routes = [
  {
    path : '', 
    redirectTo : 'consultar'
  },
  {
    path : 'consultar', 
    component : SegOperacaoListComponent
  },
  {
    path: 'cadastrar',
    component: SegOperacaoCadAltComponent
  },
  {
    path: ':codigo',
    component: SegOperacaoCadAltComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegOperacoesRoutingModule { }
