import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap';
import { FcApproval, FcHighPriority, FcInfo } from "react-icons/fc";


import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import { useSelector } from 'react-redux'

export default function PDF() {
    const tab = '\u00A0';

    const transaccionId = useSelector((state) => state.wompi.value.transactionId)
    const namePay = useSelector((state) => state.wompi.value.namePay)
    const emailPay = useSelector((state) => state.wompi.value.emailPay)

    const nameOrder = useSelector((state) => state.wompi.value.nameOrder)

    const status = useSelector((state) => state.wompi.value.status)
    const referencia = useSelector((state) => state.wompi.value.referencia)
    const numero = useSelector((state) => state.wompi.value.numero)
    const status_message = useSelector((state) => state.wompi.value.status_message)

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>{status}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )
}
