import { useState } from 'react'
import type { ServiceOrder, Status } from './types/ServiceOrder'
import { Header } from './components/Header'
import { NewServiceForm } from './components/NewServiceForm'
import { ServiceCard } from './components/ServiceCard'
import { StatusColumn } from './components/StatusColumn'
 
import './App.css'



function App() {
  const [ordens, setOrdens] = useState<ServiceOrder[]>([])
  function adicionarOrdem(novaOrdem: ServiceOrder) {
    setOrdens((ordensAtuais) => [...ordensAtuais, novaOrdem])
  }


  function mudarStatus(id: number, novoStatus: Status) {
        setOrdens((ordensAtuais) =>
        ordensAtuais.map((ordem) => {
            if (ordem.id === id) {
                return { ...ordem, status: novoStatus };
            }
            return ordem;
        })
    )
  }

  function apagarOrdem(id: number) {
    setOrdens((ordensAtuais) =>
      ordensAtuais.filter((ordem) => ordem.id !== id)
    )

  }

  return (
    <div>
      <Header />
      <NewServiceForm  onSalvar={adicionarOrdem} />

      <div className="flex flex-row gap-4">
      <StatusColumn ordens={ordens} status="aberto" titulo="Ordens Abertas" mudarStatus={mudarStatus} apagarOrdem={apagarOrdem}/>
      <StatusColumn ordens={ordens} status="em_andamento" titulo="Ordens em Andamento" mudarStatus={mudarStatus} apagarOrdem={apagarOrdem}/>
      <StatusColumn ordens={ordens} status="concluido" titulo="Ordens Concluídas" mudarStatus={mudarStatus} apagarOrdem={apagarOrdem}/>
      </div>

    </div>

  )
}



export default App
