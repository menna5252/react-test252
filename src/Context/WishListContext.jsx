import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const { token } = useContext(UserContext);

  const [wishListItems, setWishListItems] = useState([]);

  let headers = {
    token,
  };

  async function addProductToWishList(productId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      );
      if (response.data.status === "success") {
        getWishList();
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  async function getWishList() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers,
        }
      );
      if (response.data.status === "success") {
        setWishListItems(response.data.data);
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  async function removeItemFromWishList(itemId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`,
        {
          headers,
        }
      );
      if (response.data.status === "success") {
        getWishList();
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        addProductToWishList,
        getWishList,
        removeItemFromWishList,
        wishListItems,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
