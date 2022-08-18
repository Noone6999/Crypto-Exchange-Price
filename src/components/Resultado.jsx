import styled from '@emotion/styled'


// ESTILOS
const Contenedor = styled.div`
  color: #000;
  font-weight: 800;
  width: 60%;
  font-family: 'Lato', sans-serif;
  border-radius: 10px;
  text-align:center;


  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
`

const Imagen = styled.img`
display: block;
width: 120px;
`

const Texto = styled.p`
font-size: 18px;
margin: 18px 4px;
  span {
    font-weight: 700;
  }
`

const Precio = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`


// LOGICA
const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado
  return (
    <Contenedor>
      <Imagen 
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt='imagen cripto' />
      <div>
      <Precio>Price: <span>{PRICE}</span></Precio>
      <Texto>Highest price of the day : <span>{HIGHDAY}</span></Texto>
      <Texto>Lowest price of the day: <span>{LOWDAY}</span></Texto>
      <Texto>Variation last 24 hours: <span>{CHANGEPCT24HOUR}</span></Texto>
      <Texto>Latest updates: <span>{LASTUPDATE}</span></Texto>
      </div>

    </Contenedor>
  )
}

export default Resultado