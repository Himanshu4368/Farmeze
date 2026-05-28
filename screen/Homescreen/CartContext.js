import React, {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({
  children,
}) => {

  const [cart, setCart] =
    useState([]);


  /* ADD TO CART */

  const addToCart = (
    product
  ) => {

    const addQuantity =
      Number(product.quantity) || 1;

    setCart((prevCart) => {

      // Check existing item

      const existingItem =
        prevCart.find(
          (item) =>
            item.id ===
            product.id
        );

      // Increase quantity

      if (existingItem) {

        return prevCart.map(
          (item) =>

            item.id ===
            product.id

              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    addQuantity,
                }

              : item
        );
      }

      // Add new item

      return [

        ...prevCart,

        {
          ...product,
          quantity: addQuantity,
        },

      ];

    });

  };


  /* UPDATE QUANTITY */

  const updateQuantity = (
    productId,
    quantity
  ) => {

    setCart((prevCart) => {

      // Remove item if quantity becomes 0

      if (
        quantity <= 0
      ) {

        return prevCart.filter(
          (item) =>
            item.id !==
            productId
        );

      }

      return prevCart.map(
        (item) =>

          item.id ===
          productId

            ? {
                ...item,
                quantity,
              }

            : item
      );

    });

  };


  /* REMOVE ITEM */

  const removeFromCart = (
    productId
  ) => {

    setCart((prevCart) =>

      prevCart.filter(
        (item) =>
          item.id !==
          productId
      )

    );

  };


  /* CLEAR CART */

  const clearCart = () => {

    setCart([]);

  };


  /* TOTAL PRICE */

  const totalPrice =
    cart.reduce(

      (
        total,
        item
      ) =>

        total +

        Number(
          item.pricePerKg
        ) *

        Number(
          item.quantity
        ),

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


export const useCart =
  () =>
    useContext(
      CartContext
    );
