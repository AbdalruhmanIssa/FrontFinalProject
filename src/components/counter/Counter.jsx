import { useState } from "react";
import './counter.css'
export default function Counter({id}) {
  const [counter, setCounter] = useState(1);
 const removeItem = async (itemId) => {
    setLoader(true);
    try {
        const token = localStorage.getItem('userToken');
        await axios.patch(
            `https://ecommerce-node4.onrender.com/cart/removeItem`,
            { productId: itemId }, // Sending the product ID to remove
            {
                headers: {
                    Authorization: `Tariq__${token}`, // Authorization token
                },
            }
        );
        // Update the state to reflect the changes
        setCart(itemId);
        setError(null);
        setLoader(false);
        window.location.reload();
    } catch (err) {
        setError(err.response.data.message);
  setLoader(false);

    }
    finally{
        setLoader(false);
    }
};

  const decrement = () => {
   if(counter>1)
    setCounter(counter - 1);
  };

  return (
    <div></div>
  );
}
