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
        <div className="bg-white shadow-md rounded p-4 mb-4">
                <input className="border border-gray-300 rounded p-2 w-full mb-3"
                    type="text"
                    value = {nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                    placeholder="Nome do Cliente"
                />
                

                <input className="border border-gray-300 rounded p-2 w-full mb-3"
                    type="text"
                    value = {modeloAparelho}
                    onChange={(e) => setModeloAparelho(e.target.value)}
                    placeholder="Modelo do Aparelho"
                />
                

                <input className="border border-gray-300 rounded p-2 w-full mb-3"
                    type="text"
                    value = {defeito}
                    onChange={(e) => setDefeito(e.target.value)}
                    placeholder="Defeito do Aparelho"
                />
                

                <button className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>{props.onSalvar({
                    id: Date.now(),
                    nomeCliente: nomeCliente,
                    modeloAparelho: modeloAparelho,
                    defeito: defeito,
                    status: status

                })
                    setNomeCliente("")
                    setModeloAparelho("")
                    setDefeito("")
                    setStatus("aberto")

                }}>Salvar</button>

        </div>
        
    )
}