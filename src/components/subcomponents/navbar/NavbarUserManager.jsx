import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./NavbarUserManager.css";

import firebaseApp from "../../../firebase/Credentials.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function NavBarUserManager() {

  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }
  //
  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <Navbar className="nav-grande" bg="white" expand="lg">
      <Container fluid style={{ paddingLeft: "100px", paddingRight: "100px" }}>
        <div className="logo-container">
          <Navbar.Brand>
            <Link to="/">
              <a className="navbar-brand col-6">
                <img
                  className="logotipoo"
                  src="https://drive.google.com/uc?export=download&id=1qvxqCkqCxFeQyxzYarFAgABEMRX9jrIO"
                  alt="Logo Ciclopista"
                />
              </a>
            </Link>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link className="Menu" to="/">
                Inicio
              </Link>
            </Nav.Link>
            {user.rol == "admin" && (
              <>
                <Nav.Link>
                  <Link className="Menu" to="/orders">
                    Administrador
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="Menu" to="/UserManager">
                    Roles
                  </Link>
                </Nav.Link>
              </>
            )}
            <NavDropdown.Divider />

            {user && (
              <Nav.Link onClick={() => signOut(auth)}>
                <p className="Cerrar">Cerrar Sesión</p>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
