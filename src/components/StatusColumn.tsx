import type { ServiceOrder, Status } from '../types/ServiceOrder'
import {ServiceCard} from '../components/ServiceCard'

interface StatusColumnProps {
    ordens: ServiceOrder[];
    status: Status;
    titulo: string;
    mudarStatus: (id: number, novoStatus: Status) => void;
    apagarOrdem: (id: number) => void;
}

export function StatusColumn(props: StatusColumnProps) {
    const ordensFiltradas = props.ordens.filter(
    ordem => ordem.status === props.status
    )
    return(
        <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">
        {props.titulo}
        </h2>

            <div className="space-y-4">
            {ordensFiltradas.map((ordem) => (
                <ServiceCard 
                    key={ordem.id}
                    id={ordem.id}
                    nomeCliente={ordem.nomeCliente}
                    modeloAparelho={ordem.modeloAparelho}
                    defeito={ordem.defeito}
                    status={ordem.status}
                    mudarStatus={props.mudarStatus}
                    apagarOrdem={props.apagarOrdem}
                />
            ))}
            </div>

        </div>
    )
    
}

