import { useContext, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);

  const { addProductToCart } = useContext(CartContext);
  const { wishListItems } = useContext(WishListContext);
  const isWished = wishListItems.some((item) => item.id === product?.id);

  async function handleAddProductToCart(id) {
    try {
      setIsLoading(true);
      const res = await addProductToCart(id);
      toast.success(res.data.message);
      setIsLoading(false);
    } catch (error) {
      return error.message;
    }
  }

  const { addProductToWishList } = useContext(WishListContext);

  async function handleAddProductToWishList(id) {
    try {
      const res = await addProductToWishList(id);
      toast.success(res.data.message);
    } catch (error) {
      return error.message;
    }
  }

  return (
    <>
      <div className="overflow-hidden group bg-white rounded p-3 hover:shadow-md hover:shadow-green-600">
        <Link to={`/productdetails/${product?.id}/${product?.category._id}`}>
          <img
            className="w-full md:h-52 object-cover object-center"
            src={product?.imageCover}
            alt=""
          />
          <span className="text-green-600">{product?.category.name}</span>
          <h2 className="text-base font-semibold mb-3">
            {product?.title.split(" ", 2).join(" ")}
          </h2>
          <div className="flex justify-between">
            <span>{product?.price} EGP</span>
            <span>
              {product?.ratingsAverage}{" "}
              <FaStar className="inline-block text-yellow-400" />
            </span>
          </div>
        </Link>
        <div className="cart-wish flex justify-between items-center">
          <button
            disabled={isLoading}
            onClick={() => handleAddProductToCart(product?.id)}
            className="btn-green w-full mt-2 translate-y-28 group-hover:translate-y-0 transition-all duration-500"
          >
            {isLoading ? "Loading ..." : "Add Product"}
          </button>
          <button onClick={() => handleAddProductToWishList(product?.id)}>
            <FaHeart
              className={`text-2xl text-${isWished ? "red-600" : "green-600"}`}
            />
          </button>
        </div>
      </div>
    </>
  );
}
