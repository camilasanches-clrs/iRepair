import { useState } from 'react'
import type { ServiceOrder } from './types/ServiceOrder'
import { Header } from './components/Header'
import { NewServiceForm } from './components/NewServiceForm'
import { ServiceCard } from './components/ServiceCard'
import { StatusColumn } from './components/StatusColumn'
 
import './App.css'



function App() {
  const [ordens, setOrdens] = useState<ServiceOrder[]>([])
    function adicionarOrdem(novaOrdem: ServiceOrder) {
    setOrdens([...ordens, novaOrdem])
  }

  return (
    <div>
      <Header />
      <NewServiceForm  onSalvar={adicionarOrdem} />

      <div className="flex flex-row gap-4">
      <StatusColumn ordens={ordens} status="aberto" titulo="Ordens Abertas" />
      <StatusColumn ordens={ordens} status="em_andamento" titulo="Ordens em Andamento" />
      <StatusColumn ordens={ordens} status="concluido" titulo="Ordens Concluídas" />
      </div>

    </div>

  )
}



export default App
