import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/subcomponents/footer/Footer";
import ProductListContainer from "./components/products/productContainer/ProductListContainer";
import ProductDetailContainer from "./components/products/productDetailContainer/ProductDetailContainer";
import OrderListContainer from "./components/orders/orderContainer/OrderListContainer";
import { CartProvider } from "./context/CartContext";
import OrderDetailContainer from "./components/orders/orderDetailContainer/OrderDetailContainer";
import ProfilePage from "./components/profile/ProfilePage";
import UserListContainer from "./components/users/userContainer/UserListContainer";
import Checkout2 from "./components/products/cart/Checkout2";
import PageCart from "./components/products/cart/PageCart";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from 'react-redux'
import { store } from "./app/Store.jsx";

import Comprobante from "./components/products/cart/wompiComponents/Comprobante.jsx";


function App() {
  return (
    <div>
      <Provider store={store}>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/products"
                  element={<ProductListContainer />}
                />
                <Route
                  path="/products/:categoria"
                  element={<ProductListContainer />}
                />
                <Route path="/product/:id" element={<ProductDetailContainer />} />
                <Route path="/orders" element={<OrderListContainer />} />
                <Route path="/orders/:status" element={<OrderListContainer />} />
                <Route path="/orderr/:id" element={<OrderDetailContainer />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/UserManager" element={<UserListContainer />} />
                <Route path="/CheckOut" element={<Checkout2 />} />
                <Route path="/PageCart" element={<PageCart />} />
              </Routes>
            </BrowserRouter>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </Provider>
    </div>
  );
}
export default App;
