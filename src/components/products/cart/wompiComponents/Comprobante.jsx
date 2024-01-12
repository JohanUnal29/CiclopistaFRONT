import React from 'react'
import PDF from './PDF'

import { PDFViewer } from "@react-pdf/renderer";

export default function Comprobante() {
  return (
    <PDFViewer>
          <PDF />
    </PDFViewer>
  )
}
