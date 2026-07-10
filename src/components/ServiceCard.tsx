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
            <p className="mb-1"><strong>Modelo do Aparelho: </strong> {props.modeloAparelho}</p>
            <p className="mb-1"><strong>Defeito: </strong> {props.defeito}</p>
            <p className="mb-1"><strong>Status: </strong> 
            <span className= {`px-2 py-1 rounded-full text-xs font-semibold ${props.status === 'aberto' ? 'bg-red-200 text-red-800' : props.status === 'em_andamento' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{props.status}</span>
            </p>
        </div>
    )

}