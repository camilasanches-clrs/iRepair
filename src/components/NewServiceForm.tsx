import { useState } from 'react';
import type { ServiceOrder } from '../types/ServiceOrder'
import type { Status } from '../types/ServiceOrder'

interface NewServiceFormProps {
  onSalvar: (novaOS: ServiceOrder) => void
}

export function NewServiceForm(props: NewServiceFormProps) {
    const [nomeCliente, setNomeCliente] = useState("")
    const [modeloAparelho, setModeloAparelho] = useState("")
    const [defeito, setDefeito] = useState("")
    const [status, setStatus] = useState<Status>("aberto")
    return(
        <div>
                <input
                    type="text"
                    value = {nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                    placeholder="Nome do Cliente"
                />
                <p>Nome do Cliente: {nomeCliente}</p>

                <input
                    type="text"
                    value = {modeloAparelho}
                    onChange={(e) => setModeloAparelho(e.target.value)}
                    placeholder="Modelo do Aparelho"
                />
                <p>Modelo do Aparelho: {modeloAparelho}</p>

                <input
                    type="text"
                    value = {defeito}
                    onChange={(e) => setDefeito(e.target.value)}
                    placeholder="Defeito do Aparelho"
                />
                <p>Defeito do Aparelho: {defeito}</p> 

                <button onClick={()=>{props.onSalvar({
                    id: Date.now(),
                    nomeCliente: nomeCliente,
                    modeloAparelho: modeloAparelho,
                    defeito: defeito,
                    status: status

                })}}>Salvar</button>

        </div>
        
    )
}