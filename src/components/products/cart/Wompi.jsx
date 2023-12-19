import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Wompi() {

  const wompiURL = "https://sandbox.wompi.co/v1";
  const llaveComercio = "pub_test_NWdg4THkkxq0UyrnBZVZDTSJa9LEIeA9";

  const [token, setToken] = useState("");
  const [terminos, setTerminos] = useState("");

  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  //fases
  const [faseTerminos, setFaseTerminos] = useState(true);
  const [faseAceptacionTerminos, setFaseAceptacionTerminos] = useState(false);

  const TokenDeAceptación = async () => {
    try {

      axios
        .get(`${wompiURL}/merchants/${llaveComercio}`)
        .then((res) => {
          setToken(res.data.data.presigned_acceptance.acceptance_token)
          setTerminos(res.data.data.presigned_acceptance.permalink)
          setFaseAceptacionTerminos(true)
          setFaseTerminos(false)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const EnvioToken = async () => {
    try {

      axios.post(`${wompiURL}/merchants/${llaveComercio}`, {
        // Datos que deseas enviar en el cuerpo
        acceptance_token: token,
        amount_in_cents: '22500000',
        currency: 'COP',
        signature: '37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5',
        customer_email: "pepito_perez@example.com",
        reference: "2322er3234ed4",
        payment_method:
        {
          type: "NEQUI",
          phone_number: "3202420980"
        }
      }, {
        headers: {
          'Authorization': 'Bearer Token' + llaveComercio
        }
      })
        .then((res) => {
          alert("token enviado")
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }
  };

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
          <Button variant="success" disabled={!aceptaTerminos} onClick={() => EnvioToken()}>
            Pagar COn Nequi
          </Button></>
      )}


    </Container>
  )
}
