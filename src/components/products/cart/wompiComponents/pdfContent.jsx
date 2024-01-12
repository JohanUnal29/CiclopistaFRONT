import React from 'react'

import { useSelector } from 'react-redux'

export default function pdfContent() {
    const transaccionId = useSelector((state) => state.wompi.value.transactionId)
    const namePay = useSelector((state) => state.wompi.value.namePay)
    const emailPay = useSelector((state) => state.wompi.value.emailPay)

    const nameOrder = useSelector((state) => state.wompi.value.nameOrder)

    const status = useSelector((state) => state.wompi.value.status)
    const referencia = useSelector((state) => state.wompi.value.referencia)
    const numero = useSelector((state) => state.wompi.value.numero)
    const status_message = useSelector((state) => state.wompi.value.status_message)
    return (
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
                            <td><b>Transacción #</b>{tab}{tab}{tab}{transaccionId}</td>
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
    )
}
