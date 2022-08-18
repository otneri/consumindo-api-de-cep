import {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import './App.css'
import api from './components/axios/api'


function App() {
  const  [input , setInput] = useState ('');
  const [cep , setCep] = useState ([])


  async function handleSearch  () {
    
    if (input === ''){
      alert('DIGITE ALGUM CEP!')
    } 
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)

    
    } catch {
      alert('OPS, CEP NÃO ENCONTRADO!');
      setInput('')
    }

  }
  return (  
    <div className="App">

      <div className='cabeca'>
        <h2 className='title'>Buscador CEP</h2>
        <div className='conteinerInput'>
          <input className='inputCep'
          type="text"
          placeholder='Digite seu CEP...' 
          value={input}
          onChange={(e) => setInput(e.target.value) }
            />

          <button className='buttonsearch' onClick={handleSearch}>
            <FiSearch size={25}/>
          </button>
        </div>
      </div >
      
      {Object.keys(cep).length > 0 && (
        <span>{cep.length === 0 ?(
          <p>Carregando...</p>
          ): (<main className='card'>
          <h2>{`CEP : ${cep.cep}`}</h2>
          <span>{cep.logradouro}</span>
          <span>{`${cep.complemento}`}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>) }</span>
        
      )}

        
    </div>
  )
}

export default App
