import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

import Nequi from './wompiComponents/Nequi';

export default function Wompi({ referenciaDePago, hash, amount, name }) {

  const wompiURL = "https://sandbox.wompi.co/v1";
  const llaveComercio = "pub_test_NWdg4THkkxq0UyrnBZVZDTSJa9LEIeA9";

  const [token, setToken] = useState("");
  const [terminos, setTerminos] = useState("");

  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  //fases
  const [faseTerminos, setFaseTerminos] = useState(true);
  const [faseAceptacionTerminos, setFaseAceptacionTerminos] = useState(false);

  //pagos
  const [nequi, setNequi] = useState(false)

  const TokenDeAceptación = async () => {
    try {

      axios
        .get(`${wompiURL}/merchants/${llaveComercio}`)
        .then((res) => {
          setToken(res.data.data.presigned_acceptance.acceptance_token)
          setTerminos(res.data.data.presigned_acceptance.permalink)
          setFaseAceptacionTerminos(true)
          setFaseTerminos(false)
          console.log("toke: ", res.data.data.presigned_acceptance.acceptance_token)
          console.log("referencia y hash: ", referenciaDePago, hash)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  function NequiPay() {
    setNequi(true);
    setFaseAceptacionTerminos(false);
  }

  return (
    <Container>
      {faseTerminos && (
        <><Button variant="primary" onClick={() => TokenDeAceptación()}>
          Pagar con Wompi
        </Button>
        </>
      )}
      {faseAceptacionTerminos && (
        <><a href={terminos} target="_blank" rel="noopener noreferrer">
          Términos y Condiciones
        </a>
          <Form.Check
            type="checkbox"
            label="Acepto los términos y condiciones"
            checked={aceptaTerminos}
            onChange={() => setAceptaTerminos(!aceptaTerminos)}
          />
          <Button variant="success" disabled={!aceptaTerminos} onClick={() => NequiPay()}>
            Pagar con Nequi
          </Button></>
      )}

      {nequi && (
        <Nequi token={token} amount={amount} name={name} hash={hash} referenciaDePago={referenciaDePago}/>
      )
      }

    </Container>
  )
}
