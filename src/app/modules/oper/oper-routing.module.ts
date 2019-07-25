import {OperListComponent} from './oper-list/oper-list.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OperCadAltComponent} from './oper-cad-alt/oper-cad-alt.component';
import {AuthGuard} from '../../core/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cons'
  },
  {
    path: 'cons',
    component: OperListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cada',
    component: OperCadAltComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: OperCadAltComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visu',
    component: OperCadAltComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperRoutingModule {
}
