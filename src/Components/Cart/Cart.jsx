import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import CartProductDetails from "../CartProductDetails/CartProductDetails";
import { FaTrash } from "react-icons/fa";
import emptyCart from "../../assets/emptyCart.png";
import { useFormik } from "formik";

export default function Cart() {
  const {
    getUserCart,
    isLoading,
    cart,
    removeProductFromCart,
    updateProductQty,
    clearCart,
    checkOutSession,
  } = useContext(CartContext);

  useEffect(() => {
    getUserCart();
  }, []);

  const [showForm, setShowForm] = useState(false);

  async function handleRemoveProductFromCart(pId) {
    try {
      await removeProductFromCart(pId);
    } catch (error) {
      return error.message;
    }
  }

  async function handleUpdateProductQty(pId, count) {
    try {
      await updateProductQty(pId, count);
    } catch (error) {
      return error.message;
    }
  }

  async function handleClearCart() {
    try {
      await clearCart();
    } catch (error) {
      return error.message;
    }
  }

  async function handleCheckOutSession(value) {
    try {
      const response = await checkOutSession(cart.id, value);
      location.href = response.data.session.url;
    } catch (error) {
      return error.message;
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleCheckOutSession,
  });

  if (isLoading && cart.numOfCartItems == 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {cart.numOfCartItems == 0 && (
        <div className="my-5">
          <img className="mx-auto" src={emptyCart} alt="emptyCart" />
          <h2 className="my-5 text-center text-green-600">Cart is Empty</h2>
        </div>
      )}
      {cart.numOfCartItems != 0 && (
        <>
          <div className="flex justify-between rounded-lg bg-gray-200 my-5 p-4">
            <div>
              <p>Number of items in cart: {cart.numOfCartItems} item/s</p>
              <p>Total Cart Price: {cart.totalCartPrice} EGP</p>
            </div>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 rounded-lg flex gap-3 items-center bg-red-600 text-white"
            >
              Clear <FaTrash />
            </button>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cart.products.map((p) => (
                  <CartProductDetails
                    handleRemoveProductFromCart={handleRemoveProductFromCart}
                    handleUpdateProductQty={handleUpdateProductQty}
                    p={p}
                    key={p._id}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="my-5">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 rounded-lg flex gap-3 items-center bg-green-600 text-white"
            >
              Continue
            </button>
          </div>
        </>
      )}

      {showForm && (
        <>
          <div
            onClick={() => setShowForm(false)}
            className="fixed inset-0 bg-black/40 flex justify-center items-center"
          ></div>

          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-lg p-4 flex flex-col items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <h2 className="text-lg font-bold mb-4 text-green-600">
              Checkout Session
            </h2>
            <div className="mb-4 flex flex-col gap-3">
              <input
                {...formik.getFieldProps("details")}
                type="text"
                placeholder="details"
                className="w-full p-2 border rounded-lg border-gray-300"
              />
              <input
                {...formik.getFieldProps("phone")}
                type="tel"
                placeholder="phone"
                className="w-full p-2 border rounded-lg border-gray-300"
              />
              <input
                {...formik.getFieldProps("city")}
                type="text"
                placeholder="city"
                className="w-full p-2 border rounded-lg border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-3 items-center mb-4">
              <button
                type="submit"
                onSubmit={handleCheckOutSession}
                className="px-4 py-2 bg-green-900 text-white rounded-lg font-semibold"
              >
                Check Out Session
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-green-900 text-white rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
