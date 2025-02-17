import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import emptyWishList from "../../assets/emptyWishList.jpg";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRemovingIds, setLoadingRemovingIds] = useState([]);

  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);

  const [wishListItems, setWishListItems] = useState([]);

  const { getWishList, removeItemFromWishList } = useContext(WishListContext);

  const { addProductToCart } = useContext(CartContext);

  async function handleGetWishList() {
    try {
      setIsLoading(true);
      const response = await getWishList();
      setWishListItems(response.data.data);
      setIsLoading(false);
    } catch (error) {
      return error.message;
    }
  }

  async function handleAddProductToCart(id) {
    try {
      setIsLoadingAddToCart(true);
      const response = await addProductToCart(id);
      toast.success(response.data.message);
      setIsLoadingAddToCart(false);
    } catch (error) {
      return error.message;
    }
  }

  async function handleRemoveItemFromWishList(itemId) {
    setLoadingRemovingIds((prev) => [...prev, itemId]);
    try {
      const response = await removeItemFromWishList(itemId);
      toast.success(response.data.message);

      const wishlistIds = response.data.data;

      setWishListItems(
        wishListItems.filter((item) => wishlistIds.includes(item.id))
      );
      setLoadingRemovingIds((prev) => prev.filter((id) => id !== itemId));
    } catch (error) {
      return error.message;
    }
  }

  useEffect(() => {
    handleGetWishList();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {wishListItems.length === 0 ? (
        <div className="my-5">
          <img className="mx-auto" src={emptyWishList} alt="emptyWishList" />
          <h2 className="my-5 text-center text-green-600">
            Wish List is Empty
          </h2>
        </div>
      ) : (
        <>
          <h2 className="my-5 text-center text-green-600">My Wish List</h2>

          {wishListItems.map((item) => (
            <div
              key={item.id}
              className="flex itmes-center bg-gray-100 mb-4 rounded-2xl p-4"
            >
              <div className="w-52 h-52 mr-4">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={item.imageCover}
                  alt="product image"
                />
              </div>
              <div className="grow flex items-center">
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl">{item.title}</h2>
                  <p>Price: {item.price}EGP</p>
                  <button
                    onClick={() => {
                      if (loadingRemovingIds.includes(item.id)) {
                        return;
                      }
                      handleRemoveItemFromWishList(item.id);
                    }}
                    className="w-60 px-4 py-2 rounded-lg flex gap-3 justify-center items-center bg-red-600 text-white"
                  >
                    <FaTrash />
                    {loadingRemovingIds.includes(item.id)
                      ? "Removing ..."
                      : "Remove"}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  disabled={isLoadingAddToCart}
                  onClick={() => handleAddProductToCart(item.id)}
                  className="btn-green mt-2 px-4"
                >
                  {isLoadingAddToCart ? "Loading ..." : "Add Product"}
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
