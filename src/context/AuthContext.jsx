import { createContext, useState, useContext } from "react";
import Swal from "sweetalert2";

//firebase
import firebaseApp from "../firebase/Credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  onAuthStateChanged(auth, async (usuarioFirebase) => {
    if (usuarioFirebase) {
      // Si hay un usuario, realiza operaciones asíncronas aquí
      try {
        const rol = await getRol(usuarioFirebase.uid);
        setUserWithFirebaseAndRol(usuarioFirebase, rol);
      } catch (error) {
        console.error("Error al obtener el rol:", error);
      }
    } else {
      // Si no hay usuario, establece el estado a null
      setUser(null);
    }
  });
  
  async function setUserWithFirebaseAndRol(usuarioFirebase, rol) {
    const userData = {
      uid: usuarioFirebase.uid,
      email: usuarioFirebase.email,
      rol: rol,
    };
    setUser(userData);
  }
  

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
