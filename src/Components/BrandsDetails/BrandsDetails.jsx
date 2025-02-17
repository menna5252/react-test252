import axios from "axios";
import { useEffect, useState } from "react";



export default function BrandsDetails() {

const [BrandsDetails, setBrandsDetails] = useState([]);
const [bId, setBId] = useState(null);

    async function getBrandsDetails(id) {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${bId}`);
            setBrandsDetails(response.data.data);
            setBId(id);
        } catch (error) {
            return error.message;
        }
    }


        useEffect(() => {
            getBrandsDetails();
        }, [])


    return (
<>

        <h2>Brands Details</h2>

</>
    )
}
