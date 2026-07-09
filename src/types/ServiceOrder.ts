export type Status = 'aberto' | 'em andamento' | 'concluido';

export interface ServiceOrder {
    id: number;
    nomeCliente: string;
    modeloAparelho: string;
    defeito: string;
    status: Status;
}
 