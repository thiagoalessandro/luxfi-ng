import { SegFuncionalidadeOperacaoModel } from './seg-funcionalidade-operacao.model';
export class SegFuncionalidadeModel{
     
    public nome: string;
    public descricao: string;
    public rota: string;
    public listFuncionalidadeOperacao: Array<SegFuncionalidadeOperacaoModel>;
    
}