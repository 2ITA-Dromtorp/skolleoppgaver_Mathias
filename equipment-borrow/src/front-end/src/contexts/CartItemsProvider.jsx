import { createContext, useState } from "react";

export const CartItemsContext = createContext(null);

export function CartItemsProvider({ children, ...rest }) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartItemsContext.Provider value={{ cartItems, setCartItems }} {...rest}>
      {children}
    </CartItemsContext.Provider>
  );
}