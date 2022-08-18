import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
  background-color: #000;
  border: none;
  width: 40%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin: 30px auto;
  display: block;
  &:hover {
    color: #39ff14;
    cursor: pointer;
  }
`

const Form = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)


  const [moneda, SelectMonedas] = useSelectMonedas('Select your currency', monedas)
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Select your cryptocurrency', criptos)


  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCriptos = resultado.Data.map(cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }

        return objeto
      })

      setCriptos(arrayCriptos)

    }
    consultarAPI();
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if ([moneda, criptomoneda].includes('')) {
      setError(true)
      return
    }

    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })
  }

  return (
    <>
      {error && <Error>All fields are required</Error>}

      <form
        onSubmit={handleSubmit}
      >

        <SelectMonedas />
        <SelectCriptomoneda />



        <InputSubmit
          type="submit"
          value="QUOTE"
        />
      </form>
    </>


  )
}

export default Form