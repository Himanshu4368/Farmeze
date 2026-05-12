// // context/CartContext.js
// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (item) => {
//     setCart(prev => {
//       const existing = prev.find(i => i.name === item.name);
//       if (existing) {
//         return prev.map(i =>
//           i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (name, change) => {
//     setCart(prev =>
//       prev
//         .map(item =>
//           item.name === name
//             ? { ...item, quantity: item.quantity + change }
//             : item
//         )
//         .filter(item => item.quantity > 0)
//     );
//   };

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.quantity * item.pricePerKg,
//     0
//   );

//   return (
//     <CartContext.Provider value={{ cart, addToCart, updateQuantity, totalPrice }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
// context/CartContext.js

import React, {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  /* ADD TO CART */

  const addToCart = (product) => {

    setCart((prevCart) => {

      // CHECK IF ITEM ALREADY EXISTS
      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      // IF EXISTS -> INCREASE QUANTITY
      if (existingItem) {

        return prevCart.map((item) =>

          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item

        );
      }

      // ADD NEW ITEM
      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];

    });
  };

  /* UPDATE QUANTITY */

  const updateQuantity = (id, newQuantity) => {

    setCart((prevCart) => {

      // REMOVE ITEM IF QUANTITY <= 0
      if (newQuantity <= 0) {

        return prevCart.filter(
          (item) => item.id !== id
        );
      }

      // UPDATE QUANTITY
      return prevCart.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item

      );

    });
  };

  /* REMOVE ITEM */

  const removeFromCart = (id) => {

    setCart((prevCart) =>

      prevCart.filter(
        (item) => item.id !== id
      )

    );
  };

  /* CLEAR CART */

  const clearCart = () => {
    setCart([]);
  };

  /* TOTAL PRICE */

  const totalPrice = cart.reduce(

    (total, item) =>

      total + (item.pricePerKg * item.quantity),

    0

  );

  return (

    <CartContext.Provider
      value={{

        cart,

        addToCart,

        updateQuantity,

        removeFromCart,

        clearCart,

        totalPrice,

      }}
    >

      {children}

    </CartContext.Provider>

  );
};

export const useCart = () => useContext(CartContext);