import React, { useState, useEffect } from 'react'
import { Container,Table } from 'react-bootstrap';
import axios from 'axios';
import { FcApproval, FcHighPriority, FcInfo } from "react-icons/fc";

import {useSelector} from 'react-redux'

export default function Status(setEsconder, name) {

  const wompiURL = "https://sandbox.wompi.co/v1";
  const tab = '\u00A0';

  const transaccionId = useSelector((state) => state.counter.value.transactionId)
  const namePay = useSelector((state) => state.counter.value.namePay)
  const emailPay = useSelector((state) => state.counter.value.emailPay)

  const [transaccion, setTransaccion] = useState("")
  const [referencia, setReferencia] = useState("")
  const [numero, setNumero] = useState("")
  const [nombreComprador, setNombreComprador] = useState(name)
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const consultarTransaccion = async () => {
      try {

        axios
        .get(`${wompiURL}/transactions/${transaccionId}`)
          .then((res) => {
            setTransaccion(res.data.data.id)
            setReferencia(res.data.data.reference)
            setNumero(res.data.data.payment_method.phone_number)
            setStatus(res.data.data.status)
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        alert(error.message);
      }
    };

    consultarTransaccion();
  }, []);

  return (
    <Container>
      {status==="APPROVED" &&(
        <div><FcApproval/> Transacción Aprobada</div>
      )}
      {(status==="DECLINED" && status==="PENDING") &&(
        <div><FcHighPriority/> Transacción Aprobada</div>
      )}
      {status==="PENDING" &&(
        <div><FcHighPriority/> Transacción Pendiente <br/> 
        Durante la siguiente hora se notificarar por correo el estado final</div>
      )}
      <Table striped style={{ textAlign: 'center' }}>
        <tr style={{ backgroundColor: 'red' }}>
          <th colSpan={1}>Pedido a Nombre de {nombreComprador}</th>
        </tr>
        <tr style={{ backgroundColor: 'green' }}>
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
        <tr style={{ backgroundColor: 'green' }}>
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
