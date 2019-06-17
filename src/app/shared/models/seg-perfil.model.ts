import { SegFuncionalidadeModel } from './seg-funcionalidade.model';
import { AbstractModel } from './abstract-model';
import {SegPermissaoModel} from './seg-permissao.model';
export class SegPerfilModel extends AbstractModel{

  public nome: string;
  public descricao: string;
  public listPermissao: Array<SegPermissaoModel>;
}
