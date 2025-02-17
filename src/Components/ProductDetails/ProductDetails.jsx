import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa6";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { pId, cId } = useParams();

  const getProductDetails = () =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${pId}`);

  const { isLoading, data } = useQuery({
    queryKey: ["getProductDetails", pId],
    queryFn: getProductDetails,
    staleTime: 5000 * 1000,
  });

  async function getProducts() {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    return response;
  }

  const { isLoading: isLoadingRelated, data: relatedProducts } = useQuery({
    queryKey: ["getProducts", pId],
    queryFn: getProducts,
    staleTime: 5000 * 1000,
  });

  useEffect(() => {
    getProducts();
  }, [cId]);

  const [wishColor, setWishColor] = useState("green-600");

  const { addProductToCart } = useContext(CartContext);

  async function handleAddProductToCart(id) {
    try {
      // isLoading
      const res = await addProductToCart(id);
      toast.success(res.data.message);
    } catch (error) {
      return error.message;
    }
  }

  const { addProductToWishList } = useContext(WishListContext);

  async function handleAddProductToWishList(id) {
    try {
      const res = await addProductToWishList(id);
      toast.success(res.data.message);
      setWishColor("red-600");
    } catch (error) {
      return error.message;
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!relatedProducts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4 mt-7">
        <div className="col-span-12 md:col-span-4">
          <img
            src={data.data.data?.imageCover}
            className="w-full max-w-60 md:max-w-full mx-auto "
            alt=""
          />
        </div>
        <div className="col-span-12 md:col-span-8 self-center">
          <h2 className="mb-2">{data.data.data?.title}</h2>
          <p className="mb-3 text-black/60">{data.data.data?.description}</p>
          <p className="mb-3">{data.data.data?.category.name}</p>
          <div className="flex justify-between mb-2">
            <span>{data.data.data?.price} Egp</span>
            <span className="flex items-center gap-2">
              {data.data.data?.ratingsAverage}{" "}
              <FaStar className="text-yellow-500" />{" "}
            </span>
          </div>
          <div className="cart-wish flex flex-wrap justify-around items-center px-6">
            <button
              disabled={isLoading}
              onClick={() => handleAddProductToCart(data.data.data?.id)}
              className="btn-green w-8/12 mt-2"
            >
              {isLoading ? "Loading ..." : "Add Product"}
            </button>
            <button
              onClick={() => handleAddProductToWishList(data.data.data?.id)}
            >
              <FaHeart className={`inline-block text-3xl text-${wishColor}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {relatedProducts.data.data
          .filter((p) => p.category._id === cId)
          .slice(0, 5)
          .map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
      </div>
    </>
  );
}
