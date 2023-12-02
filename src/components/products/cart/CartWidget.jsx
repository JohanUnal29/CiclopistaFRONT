import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartWidget = () => {

  const { cantidadEnCarrito } = useContext(CartContext);

  return (
    <div className='Menu'>
      <Link to="/PageCart"/>
      <FaShoppingCart size={20} />
      <span className="numerito"> {cantidadEnCarrito()}</span>
    </div>
  )
}

export default CartWidget