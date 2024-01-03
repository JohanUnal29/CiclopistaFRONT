import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { FcApproval, FcHighPriority, FcInfo } from "react-icons/fc";

import { useSelector } from 'react-redux'

export default function Status({ setEsconder, name }) {

  const wompiURL = process.env.WOMPI_URL;

  const tab = '\u00A0';

  const transaccionId = useSelector((state) => state.wompi.value.transactionId)
  const namePay = useSelector((state) => state.wompi.value.namePay)
  const emailPay = useSelector((state) => state.wompi.value.emailPay)

  const [transaccion, setTransaccion] = useState("")
  const [referencia, setReferencia] = useState("")
  const [numero, setNumero] = useState("")
  const [nombreComprador, setNombreComprador] = useState(name)
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const consultarTransaccion = async () => {
      try {
        const response = await axios.get(`${wompiURL}/transactions/${transaccionId}`);
        const data = response.data.data;

        setTransaccion(data.id);
        setReferencia(data.reference);
        setNumero(data.payment_method.phone_number);
        setStatus(data.status);

        if (data.status !== 'APPROVED' && data.status !== 'DECLINED') {
          // Si el estado no es "APPROVED" ni "DECLINED", vuelve a consultar después de un tiempo (por ejemplo, 5 segundos)
          setTimeout(consultarTransaccion, 5000);
        }
      } catch (error) {
        console.error(error);
        // Manejar el error según tus necesidades
      }
    };

    // Inicia la consulta
    consultarTransaccion();
  }, [transaccionId]);


  return (
    <Container>
      {status === "APPROVED" && (
        <div><FcApproval /> Transacción Aprobada</div>
      )}
      {status === "DECLINED" && (
        <div><FcHighPriority /> Transacción Rechazada, intenta de nuevo con el mismo u otro medio de pago</div>
      )}
      {status === "PENDING" && (
        <div><FcHighPriority /> Transacción Pendiente <br />
          Si desea puede esperar o durante la siguiente hora se notificara por correo el estado final</div>
      )}
      <Table striped style={{ textAlign: 'center' }}>
        <tr style={{ backgroundColor: '#FF4545' }}>
          <th colSpan={1}>Pedido a Nombre de {nombreComprador}</th>
        </tr>
        <tr style={{ backgroundColor: '#A5FF45' }}>
          <th colSpan={1}>Información de la transacción</th>
        </tr>
        <tbody style={{ textAlign: 'center' }}>
          <tr>
            <td><b>Transacción #</b>{tab}{tab}{tab}{transaccion}</td>
          </tr>
          <tr>
            <td><b>Referencia</b>{tab}{tab}{tab}{referencia}</td>
          </tr>
          <tr>
            <td><b>Email</b>{tab}{tab}{tab}{emailPay}</td>
          </tr>
        </tbody>
        <tr style={{ backgroundColor: '#A5FF45' }}>
          <th colSpan={1}>Información del pagador</th>
        </tr>
        <tbody>
          <tr>
            <td><b>Nombre</b>{tab}{tab}{tab}{namePay}</td>
          </tr>
          <tr>
            <td><b>Teléfono</b>{tab}{tab}{tab}{numero}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}
