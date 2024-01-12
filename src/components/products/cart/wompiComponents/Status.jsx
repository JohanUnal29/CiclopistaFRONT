import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { FcApproval, FcHighPriority, FcInfo } from "react-icons/fc";

import { PDFDownloadLink, Document } from "@react-pdf/renderer";

import { useSelector } from 'react-redux'
import PDF from './PDF';

export default function Status({ setEsconder }) {

  const wompiURL = process.env.REACT_APP_API_URL2;

  const tab = '\u00A0';

  const transaccionId = useSelector((state) => state.wompi.value.transactionId)
  const namePay = useSelector((state) => state.wompi.value.namePay)
  const emailPay = useSelector((state) => state.wompi.value.emailPay)

  const nameOrder = useSelector((state) => state.wompi.value.nameOrder)

  const [transaccion, setTransaccion] = useState("")
  const [referencia, setReferencia] = useState("")
  const [numero, setNumero] = useState("")
  const [status, setStatus] = useState("");
  const [status_message, setStatus_message] = useState("");
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
        setStatus_message(data.status_message)

        if (data.status !== 'APPROVED' && data.status !== 'DECLINED' && data.status !== 'ERROR') {
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

  const pdfContent = (
    <Document>
      <Container>

        {status === "APPROVED" && (
          <div><FcApproval /> Transacción Aprobada</div>
        )}
        {(status === "DECLINED") && (
          <div><FcHighPriority /> Transacción Rechazada, intenta de nuevo con el mismo u otro medio de pago</div>
        )}
        {(status === "ERROR") && (
          <div><FcHighPriority /> {status_message}</div>
        )}
        {status === "PENDING" && (
          <div><FcHighPriority /> Transacción Pendiente <br />
            Si deseas puedes esperar en esta pestaña para recibir una respuesta final e imprimir tu comprobante<br />
            o en un rato se notificara a tu correo correo el estado final por parte de Wompi</div>
        )}
        <Table striped style={{ textAlign: 'center' }}>
          <tr style={{ backgroundColor: '#FF4545' }}>
            <th colSpan={1}>Pedido a Nombre de {nameOrder}</th>
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
    </Document>
  );


  return (

    <>
      <Container>

        {status === "APPROVED" && (
          <div><FcApproval /> Transacción Aprobada</div>
        )}
        {(status === "DECLINED") && (
          <div><FcHighPriority /> Transacción Rechazada, intenta de nuevo con el mismo u otro medio de pago</div>
        )}
        {(status === "ERROR") && (
          <div><FcHighPriority /> {status_message}</div>
        )}
        {status === "PENDING" && (
          <div><FcHighPriority /> Transacción Pendiente <br />
            Si deseas puedes esperar en esta pestaña para recibir una respuesta final e imprimir tu comprobante<br />
            o en un rato se notificara a tu correo correo el estado final por parte de Wompi</div>
        )}
        <Table striped style={{ textAlign: 'center' }}>
          <tr style={{ backgroundColor: '#FF4545' }}>
            <th colSpan={1}>Pedido a Nombre de {nameOrder}</th>
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

      <PDFDownloadLink document={<Status />} fileName="comprobanteCiclopista.pdf">
        {({ loading, url, error, blob }) =>
          loading ? (
            <button>Loading Document ...</button>
          ) : (
            <button>Download now!</button>
          )
        }
      </PDFDownloadLink>
    </>

  )
}
