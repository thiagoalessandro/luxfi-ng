import {SharedModule} from '../../shared/shared.module';
import {NgModule} from '@angular/core';
import {OperListComponent} from './oper-list/oper-list.component';
import {OperCadAltComponent} from './oper-cad-alt/oper-cad-alt.component';
import {OperRoutingModule} from './oper-routing.module';

@NgModule({
  declarations: [OperCadAltComponent,
    OperListComponent],
  imports: [
    SharedModule,
    OperRoutingModule
  ]
})
export class OperModule {
}
