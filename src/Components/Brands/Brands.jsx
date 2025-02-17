import axios from "axios";
import { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  async function getBrands() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(response.data.data);
      setIsLoading(false);
    } catch (error) {
      return error.message;
    }
  }

  const [brandsDetails, setBrandsDetails] = useState([]);

  const [showDetails, setShowDetails] = useState(false);

  async function getBrandsDetails(id) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setBrandsDetails(response.data.data);
      setShowDetails(true);
    } catch (error) {
      return error.message;
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <h2 className="text-center my-5 text-green-800">All Brands</h2>

      <div>
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 rounded-lg">
          {isLoading ? (
            <h2>Loading.....</h2>
          ) : (
            brands.map((brand) => {
              return (
                <div
                  onClick={() => {
                    getBrandsDetails(brand._id);
                  }}
                  className="flex flex-col justify-center items-center hover:shadow-md hover:shadow-green-600 transition-all duration-500 border-2 p-2"
                  key={brand._id}
                >
                  <img className="w-full" src={brand.image} alt={brand.name} />
                  <h2 className="text-center mb-5">{brand.name}</h2>
                </div>
              );
            })
          )}
        </div>
      </div>

      {showDetails && (
        <>
          <div
            onClick={() => setShowDetails(false)}
            className="fixed inset-0 bg-black/40 flex justify-center items-center"
          ></div>
          <div className="bg-white rounded-lg p-4 flex flex-col items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center px-5">
              <div className="brandsText">
                <h2 className="text-center text-green-800">
                  {brandsDetails.name}
                </h2>
                <p>{brandsDetails.slug}</p>
              </div>
              <img
                className="w-full"
                src={brandsDetails.image}
                alt={brandsDetails.name}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              className="px-10 py-2 bg-green-900 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
}
