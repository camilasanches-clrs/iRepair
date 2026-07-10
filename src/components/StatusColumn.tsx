import type { ServiceOrder, Status } from '../types/ServiceOrder'
import {ServiceCard} from '../components/ServiceCards'

interface StatusColumnProps {
    ordens: ServiceOrder[];
    status: Status;
    titulo: string;
    
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
                    nomeCliente={ordem.nomeCliente}
                    modeloAparelho={ordem.modeloAparelho}
                    defeito={ordem.defeito}
                    status={ordem.status}
                />
            ))}
            </div>

        </div>
    )
    
}

