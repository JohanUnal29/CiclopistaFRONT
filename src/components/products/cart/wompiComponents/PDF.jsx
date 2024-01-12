import React from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Status from './Status';

export default function PDF() {
    return (
        <div>
            <PDFDownloadLink document={<Status/>} fileName="comprobanteCiclopista.pdf">
                {({ loading, url, error, blob }) =>
                    loading ? (
                        <button>Loading Document ...</button>
                    ) : (
                        <button>Download now!</button>
                    )
                }
            </PDFDownloadLink>
        </div>
    )
}
