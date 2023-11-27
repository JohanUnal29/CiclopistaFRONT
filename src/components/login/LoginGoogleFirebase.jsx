import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

import firebaseApp from "../../firebase/Credentials";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const auth = getAuth(firebaseApp);

export default function LoginGoogleFirebase() {
  const firestore = getFirestore(firebaseApp);

  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Ahora puedes acceder a user.displayName, user.email, etc.
      // Verifica en tu base de datos si el usuario ya existe antes de registrarlo.
      const userRef = firestore.collection("usuarios").doc(user.uid);
      const doc = await userRef.get();

      if (!doc.exists) {
        // El usuario no existe en la base de datos, regístralo.
        const [firstName, lastName] = user.displayName.split(" ");
        await userRef.set({
          firstName,
          lastName,
          rol: "user",
          email: user.email,
          // Otros campos que desees almacenar
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Button variant="danger" onClick={signInWithGoogle} disabled={loading}>
      {loading ? "Cargando..." : <FaGoogle />}
    </Button>
  );
}
