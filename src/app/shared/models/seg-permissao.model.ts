import { SegSubMenuModel } from './seg-sub-menu.model';
import { AbstractModel } from './abstract-model';
import {SegPerfilModel} from './seg-perfil.model';
import {SegFuncionalidadeOperacaoModel} from './seg-funcionalidade-operacao.model';

export class SegPermissaoModel extends AbstractModel{

  public perfil: SegPerfilModel;
  public funcionalidadeOperacao: SegFuncionalidadeOperacaoModel;

}
