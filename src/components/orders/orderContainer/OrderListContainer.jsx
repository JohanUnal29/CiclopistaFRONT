import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderList from "./OrderList";
import NavBar3 from "../../subcomponents/navbar/Navbar3";

//firebase
import { useAuth } from "../../../context/AuthContext";

export default function OrderListContainer() {

  const [orders, setOrders] = useState([]);
  const status = useParams().status;

  const apiURL = process.env.REACT_APP_API_URL;

  const { user, loading } = useAuth(); 

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
  }, [status]);

  return (
    <div>
      <NavBar3></NavBar3>
      <OrderList orders={orders} />
    </div>
  )
}

