import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () =>{
    return useContext(CartContext);
}

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(2);
  
    const addToCart = async (productId) => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/add-to-cart`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product: productId }),
        });
  
        const data = await response.json();
        console.log("add to cart", data)
  
        if (data.success) {
          setCart(data.cart.items);
          setCartCount((prevCount) => prevCount + 1);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };
  

    const fetchCartCount = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/cart-count`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        console.log("cart count", data)
  
        if (data.success) {
          setCartCount(data.data.count);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
  
    useEffect(() => {
      fetchCartCount();
    }, []);
  
    return (
      <CartContext.Provider value={{ cart, cartCount, addToCart, fetchCartCount}}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export default CartProvider;