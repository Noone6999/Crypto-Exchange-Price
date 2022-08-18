import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Form from './components/Form'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'


const Contenedor = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #000;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #39ff14;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [ monedas, setMonedas ] = useState({})
  const [ resultado, setResultado ] = useState({})
  const [ cargando, setCargando ] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      
      const cotizarCripto = async () => {
        setCargando(true)

        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)
      }

      cotizarCripto();
    }
  }, [monedas])

  return (
    <Contenedor>

      <div>
        <Heading>Crypto Exchange Price</Heading>

        <Form 
          setMonedas={setMonedas}
        />

        {cargando && <Spinner/>}
        {resultado.PRICE && <Resultado resultado={resultado}/>}  
      </div>


    </Contenedor>

  )
}

export default App
