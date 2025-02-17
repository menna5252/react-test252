import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetProducts() {

    const getProducts = () => axios.get("https://ecommerce.routemisr.com/api/v1/products");

    const { isLoading, data : products } = useQuery({
        queryKey: ["getProducts"],
        queryFn: getProducts,
        staleTime: 5000 * 1000,
        select: (data) => data.data.data,
        retry: ()=> confirm('Error , do you want to retry?'),
    })

    return { isLoading, products }
}