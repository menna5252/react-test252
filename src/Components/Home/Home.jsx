import ProductCard from "../ProductCard/ProductCard.jsx";
import MainSlider from "../MainSlider/MainSlider.jsx";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";
import { useGetProducts } from "../../Hooks/UseGetProducts.jsx";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

export default function Home() {
  const { isLoading, products: allProducts } = useGetProducts();

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  function handleFuseSearch() {
    if (!allProducts) {
      return;
    }

    const fuseOptions = {
      keys: ["category.name", "title"],
      threshold: 0.3,
    };

    const fuse = new Fuse(allProducts, fuseOptions);

    if (searchTerm) {
      const results = fuse.search(searchTerm);
      setSearchResults(results.map((result) => result.item));
    } else {
      setSearchResults(allProducts);
    }
  }

  useEffect(() => {
    handleFuseSearch();
  }, [searchTerm, allProducts]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="my-10">
        <MainSlider />
      </div>

      <div className="my-12  rounded-xl py-10 px-4 bg-gray-100">
        <CategorySlider />
      </div>
      <div className="w-full pb-5 text-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="border rounded px-60 py-2 "
        />
        {searchTerm && searchResults.length === 0 && (
          <p>No products found matching {searchTerm}</p>
        )}
      </div>

      {isLoading ? (
        <h2>Loading ......</h2>
      ) : (
        <>
          {searchTerm && (
            <div className="">
              <h2>Search Results</h2>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 my-7">
                {searchResults.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {!searchTerm && (
            <div className="">
              <h2>All Products</h2>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 my-7">
                {allProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
