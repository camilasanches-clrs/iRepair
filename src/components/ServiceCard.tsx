import type { Status } from '../types/ServiceOrder';
interface ServiceCardProps {
    nomeCliente: string;
    modeloAparelho: string;
    defeito: string;
    status: Status;
}



export function ServiceCard(props: ServiceCardProps) {
    return(
        <div className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">{props.nomeCliente}</h2>
            <p className="mb-1"><strong>Modelo do Aparelho:</strong> {props.modeloAparelho}</p>
            <p className="mb-1"><strong>Defeito:</strong> {props.defeito}</p>
            <p className="mb-1"><strong>Status:</strong> {props.status}</p> // por condicionais aqui pra depender do estado a estilizaçãp
        </div>
    )

}