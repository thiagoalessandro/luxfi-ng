import {SegMenuModel} from '../../shared/models/seg-menu.model';

export class UserAuthDto {

  public nome: string;
  public email: string;
  public usuario: string;
  public perfil: string;
  public tokenAccess: string;
  public listMenu: SegMenuModel[];
}
