import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import PropTypes from "prop-types";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(UserContext);

  const [cart, setCart] = useState({
    numOfCartItems: 0,
    id: "",
    totalCartPrice: 0,
    products: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    token,
  };

  async function getUserCart() {
    setIsLoading(true);

    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers,
      }
    );
    const { data } = response;

    if (data.status !== "success") return; // TODO: Handle error

    const {
      numOfCartItems,
      cartId,
      data: { products, totalCartPrice },
    } = data;

    setCart({
      id: cartId,
      numOfCartItems,
      totalCartPrice,
      products,
    });

    setIsLoading(false);
  }

  async function addProductToCart(id) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers,
        }
      );

      await getUserCart();

      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function removeProductFromCart(pId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${pId}`,
        {
          headers,
        }
      );

      await getUserCart();

      return response;
    } catch (error) {
      return error.message;
    }
  }

  async function updateProductQty(pId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${pId}`,
        {
          count,
        },
        {
          headers,
        }
      );

      await getUserCart();

      return response;
    } catch (error) {
      return error.message;
    }
  }

  async function clearCart() {
    try {
      const response = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers,
        }
      );

      await getUserCart();

      return response;
    } catch (error) {
      return error.message;
    }
  }

  async function checkOutSession(cId, shippingAddress) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cId}?url=https://hozaifaodawood.github.io/e-commerce/`,
        {
          shippingAddress: shippingAddress,
        },
        {
          headers,
        }
      );

      return response;
    } catch (error) {
      return error.message;
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        removeProductFromCart,
        updateProductQty,
        clearCart,
        getUserCart,
        checkOutSession,
        isLoading,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
