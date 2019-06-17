import { AbstractModel } from './abstract-model';
import { SegOperacaoModel } from './seg-operacao.model';
export class SegFuncionalidadeOperacaoModel extends AbstractModel{
    
    public operacao: SegOperacaoModel;
    public menuPrincipal: boolean;
	public ordem: number;

}