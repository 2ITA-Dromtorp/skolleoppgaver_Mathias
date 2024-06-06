import { useContext } from 'react';
import { CartItemsContext } from '../contexts/CartItemsProvider';

function useCart() {
  return useContext(CartItemsContext);
}

export default useCart;
