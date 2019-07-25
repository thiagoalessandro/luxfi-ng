import {SegSubMenuModel} from './seg-sub-menu.model';
import {AbstractModel} from './abstract-model';

export class SegMenuModel extends AbstractModel {

  public nome: string;
  public icone: string;
  public ordem: number;
  public listSubMenu: Array<SegSubMenuModel>;
}
