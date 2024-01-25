import React, { useState} from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux'

import { setImage } from "../../../features/product/ProductSlice";

export default function ImageModal(props) {

  const dispatch = useDispatch()

  //dispatch(setNumero2(data.payment_method.phone_number));

  const [fileName, setFileName] = useState("Subir una imagen");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    const SIZE_50MB = 50 * 1024 * 1024;
    const isValidSize = file.size < SIZE_50MB;
    // const isValidSize = file.size < 200 * 1024
    const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
    const isValidType = isNameOfOneImageRegEx.test(file.name);

    if (!isValidSize)
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Imagen muy pesada, excede los 50MB!",
        showConfirmButton: false,
        timer: 1500,
      });
    if (!isValidType)
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Solo puedes subir imagenes!",
        showConfirmButton: false,
        timer: 1500,
      });

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfilePic = () => {
    
    dispatch(setImage(selectedFile))
    props.onHide();

  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleccionar imagen</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg, .jpeg, .gif, .png"
            onChange={handleFileChange}
          />
        </Form.Group>
        <img
          className="img-fluid mt-2"
          src={selectedFile}
          alt="profile-previw"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            props.onHide();
            setSelectedFile(null);
          }}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdateProfilePic}>
          Actualizar imagen
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
