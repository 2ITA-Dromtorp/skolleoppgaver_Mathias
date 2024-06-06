import { createContext, useState } from "react";

const cartStorageKey = "cart";

/**
 * Retrieves the cached cart from local storage.
 */
function getCachedCart() {
  const cartData = localStorage.getItem(cartStorageKey);
  try {
    return cartData == null ? null : JSON.parse(cartData);
  }
  catch (error) {
    console.error("Failed to read stored cart", error);
    localStorage.removeItem(cartStorageKey);
  }
}

/**
 * Context object for managing cart items.
 */
const CartItemsContext = createContext(null);

/**
 * Provides a context for managing cart items.
 */
function CartItemsProvider({ children, ...rest }) {
  const [cartItems, setCartItems] = useState(getCachedCart());

  const getCartItem = (product) => cartItems.find(item => item.product.id === product.id);

  const isProductInCart = (product) => getCartItem(product) != null;

  const clearCart = () => {
    localStorage.removeItem(cartStorageKey);
    setCartItems([]);
  }

  const addCartItem = (product) => {
    const currentItems = [...cartItems];
    const existingItem = currentItems.find(item => item.product.id === product.id)

    if (existingItem) {
      if (existingItem.quantity < product.quantityAvailable) {
        existingItem.quantity += 1;
      }
    } else if (product.quantityAvailable >= 1) {
      currentItems.push({
        product,
        quantity: 1
      });
    }

    localStorage.setItem(cartStorageKey, JSON.stringify(currentItems));
    setCartItems(currentItems);
  };

  const removeCartItem = (product) => {
    const currentItems = [...cartItems];
    const existingItem = currentItems.find(item => item.product.id === product.id)

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        // Quantity = 0, remove from cart
        currentItems.splice(currentItems.indexOf(existingItem), 1);
      }
    }
    else {
      throw new Error("removeItem: Product does not exist.");
    }

    localStorage.setItem(cartStorageKey, JSON.stringify(currentItems));
    setCartItems(currentItems);
  };

  const cart = { cartItems, addCartItem, removeCartItem, getCartItem, isProductInCart, clearCart };


  return (
    <CartItemsContext.Provider value={cart} {...rest}>
      {children}
    </CartItemsContext.Provider>
  );
}

export { CartItemsContext, CartItemsProvider }
export default CartItemsProvider;
