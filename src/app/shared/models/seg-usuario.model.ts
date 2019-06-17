import {SegSubMenuModel} from './seg-sub-menu.model';
import {AbstractModel} from './abstract-model';
import {SegPerfilModel} from './seg-perfil.model';

export class SegUsuarioModel extends AbstractModel {

  public nome: string;
  public login: string;
  public email: string;
  public password: string;
  public perfil: SegPerfilModel;
}
