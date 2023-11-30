import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderList from "./OrderList";
import NavBar3 from "../../subcomponents/navbar/Navbar3";
import firebaseApp from "../../../firebase/Credentials";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function OrderListContainer() {

  const [orders, setOrders] = useState([]);
  const status = useParams().status;

  const apiURL = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

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


  useEffect(() => {
    // Verifica si 'user' no es null antes de realizar la solicitud a la API
    if (user) {
      if (status) {
        axios.get(`${apiURL}/api/purchase/status/${status}/${user.uid}`)
          .then(res => {
            setOrders(res.data.payload);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios.get(`${apiURL}/api/purchase/${user.uid}`)
          .then(res => {
            setOrders(res.data.payload);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }, [status, user]);

  console.log(orders);

  return (
    <div>
      <NavBar3></NavBar3>
      <OrderList orders={orders} />
    </div>
  )
}

