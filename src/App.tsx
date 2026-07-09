import { useState } from 'react'
import type { ServiceOrder } from './types/ServiceOrder'
import { Header } from './components/Header'
import { NewServiceForm } from './components/NewServiceForm'
import { ServiceCard } from './components/ServiceCard'
 
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
       {ordens.map((ordem) => (
      <ServiceCard
        key={ordem.id}
        nomeCliente={ordem.nomeCliente}
        modeloAparelho={ordem.modeloAparelho}
        defeito={ordem.defeito}
        status={ordem.status}
      />
    ))}
    </div>

  )
}



export default App
