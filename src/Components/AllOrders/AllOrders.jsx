import axios from "axios"
import { useEffect, useState } from "react";


export default function AllOrders() {

    const [orders, setOrders] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    async function getOrders() {
        try {
            setIsLoading(true);
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/679d10280cb63db39a0cea50');
            // user id is fixed with my converted token by JWT
            setOrders(response.data);            
            setIsLoading(false);
        } catch (error) {
            return error.message;
        }

    }


    useEffect(() => {
        getOrders()
    }, [])



    return (
        <>

            <h2 className="text-center text-green-800 mt-5">User Orders</h2>

            {
                orders.length == 0 && <div className="my-5">
                    <h2 className="my-5 text-center text-green-600">No Pending Orders</h2>
                </div>
            }


            {
                isLoading ? <div>Loading...</div> :
                    <div className="flex">
                        {
                            orders.map((p) => {
                                return <div key={p.id} className="bg-white p-5 m-5 rounded-md shadow-md mx-auto">
                                    <h2 className="text-lg text-gray-800">User Name: {p?.user?.name}</h2>
                                    <p className="text-lg text-gray-800">shippingPrice: {p?.shippingPrice}</p>
                                    <p className="text-sm text-gray-600">taxPrice: {p?.taxPrice}</p>
                                    <p className="text-sm text-gray-600">totalOrderPrice: {p?.totalOrderPrice}</p>
                                    <p className="text-sm text-gray-600">No. of CartItems: {p?.cartItems?.length}</p>
                                </div>
                            })
                        }
                    </div >
            }

        </>
    )
}
