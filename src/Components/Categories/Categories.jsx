import axios from "axios";
import { useEffect, useState } from "react";


export default function Categories() {

    const [categories, setCategories] = useState([]);

    async function getCategories() {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
    }

    useEffect(() => {
        getCategories();
    }, [])




    return (
        <>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-gray-100 mt-10">
                {
                    categories.map((c) =>
                        <div key={c._id} className="bg-white rounded p-3 hover:shadow-md hover:shadow-green-600">
                            <img className="w-full h-44 object-cover object-center" src={c.image} alt={c.name} />
                            <h2 className="pt-3 text-lg text-center text-green-600 text-bold">{c.name}</h2>
                        </div>
                    )
                }
            </div>

        </>
    )
}
