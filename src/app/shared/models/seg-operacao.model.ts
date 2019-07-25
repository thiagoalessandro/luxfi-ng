import {AbstractModel} from './abstract-model';

export class SegOperacaoModel extends AbstractModel {

  public nome: string = null;
  public sigla: string = null;
  public descricao: string = null;
  public icone: string = null;
  public enable: boolean = null;
  public immediateAction: boolean = null;
  public dataId: boolean = null;
  public singleSelect: boolean = false;

}
