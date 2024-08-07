import React, { useState, useEffect } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { FcApproval, FcHighPriority, FcInfo } from "react-icons/fc";

import { useSelector, useDispatch } from 'react-redux'

import { setStatus2, setReferencia2, setNumero2, setStatus_message2 } from '../../../../features/wompi/WompiSlice';

import { jsPDF } from "jspdf"
import 'jspdf-autotable'

import cplogo from "../../../../Img/cplogo.png"


export default function Status({ setEsconder }) {

  const dispatch = useDispatch()

  const wompiURL = process.env.REACT_APP_API_URL2;

  const tab = '\u00A0';

  const transactionId = useSelector((state) => state.wompi.value.transactionId)
  const namePay = useSelector((state) => state.wompi.value.namePay)
  const emailPay = useSelector((state) => state.wompi.value.emailPay)

  const nameOrder = useSelector((state) => state.wompi.value.nameOrder)
  const emailBuyer = useSelector((state) => state.wompi.value.emailBuyer)

  const [transaction, setTransaction] = useState("")
  const [reference, setReference] = useState("")
  const [number, setNumber] = useState("")
  const [status, setStatus] = useState("");
  const [status_message, setStatus_message] = useState("");

  const [amount, setAmount] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const consultarTransaccion = async () => {
      try {
        const response = await axios.get(`${wompiURL}/transactions/${transactionId}`);
        const data = response.data.data;
        console.log(response);
        setTransaction(data.id);
        setReference(data.reference);
        dispatch(setReferencia2(data.reference));
        setNumber(data.payment_method.phone_number);
        dispatch(setNumero2(data.payment_method.phone_number));
        setStatus(data.status);
        dispatch(setStatus2(data.status));
        setStatus_message(data.status_message)
        dispatch(setStatus_message2(data.status_message));
        setAmount((data.amount_in_cents / 100))

        if (data.status == 'APPROVED') {

          try {
            const receiptDetail = {
              emailBuyer: emailBuyer,
              nameOrder: nameOrder,
              transaction: transaction,
              reference: reference,
              emailPay: emailPay,
              metodPay: 'NEQUI',
              amount: amount,
            };
            axios
              .post(`${apiURL}/api/purchase/purchaseemail`, receiptDetail)
              .then((res) => {
                console.log("email final enviado")
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (error) {
            console.log(error)
          }
        }

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
  }, [transactionId]);


  useEffect(() => {
    const updateTicket = async () => {
      try {
        const changes = {
          statusPay: status,
        };
        axios
          .put(`${apiURL}/api/purchase/${reference}`, changes)
          .then((res) => {
            console.log("status actualizado")
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        alert(error.message);
      }

    };

    // Inicia la consulta
    updateTicket();
  }, [status]);

  //comprobante de pago
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.addImage(cplogo, 'png', 70, 10, 60, 30, 'cplogo', 'FAST', 0)
    doc.text(`Pedido a nombre de: ${nameOrder}`, 42, 50);
    doc.text(`Estado de la transacción: ${status}`, 60, 60);
    doc.text(`Información de la transacción:`, 68, 90);
    const columns = ['Transacción #', 'Referencia', 'Email', 'Total']
    const data = [
      [`${transaction}`, `${reference}`, `${emailPay}`, `${amount}`]
    ];
    doc.autoTable({
      startY: 100,
      head: [columns],
      body: data
    })
    doc.text(`Información del pagador:`, 74, 135);
    const columns2 = ['Nombre', 'Teléfono']
    const data2 = [
      [`${namePay}`, `${number}`]
    ];

    doc.autoTable({
      startY: 140,
      head: [columns2],
      body: data2
    })

    doc.save(`Comprobante_${reference}.pdf`)
  }


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
          <div><FcHighPriority /> Transacción Pendiente<br />
            Esperar en esta pestaña para recibir una respuesta final e imprimir tu comprobante</div>
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
              <td><b>Transacción #</b>{tab}{tab}{tab}{transaction}</td>
            </tr>
            <tr>
              <td><b>Referencia</b>{tab}{tab}{tab}{reference}</td>
            </tr>
            <tr>
              <td><b>Email</b>{tab}{tab}{tab}{emailPay}</td>
            </tr>
            <tr>
              <td><b>Total</b>{tab}{tab}{tab}{amount}</td>
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
              <td><b>Teléfono</b>{tab}{tab}{tab}{number}</td>
            </tr>
          </tbody>
        </Table>

        <Button variant='danger' disabled={status === "PENDING"} onClick={generarPDF}>Generar PDF</Button>
      </Container>



    </>
  )
}
