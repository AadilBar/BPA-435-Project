import { PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { getDatabase, ref, remove } from "firebase/database";
import { UserContext } from "../App";
import { toast } from "react-toastify";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { user } = useContext(UserContext);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        setIsProcessing(true);

        await stripe.confirmPayment({
            elements,
            confirmParams: {
            return_url: `${window.location.origin}/BPA-435-Project/#/`,
            },
            redirect: "if_required",
        })
        .then(function(result){

            if(result.error){
                setMessage(`Payment failed: ${result.error.message}`);
            }
            else if(result.paymentIntent){
                setMessage("Payment succeeded!");
                const database = getDatabase();
                if (user && user.email) {
                    const cartRef = ref(database, `users/${user.email.replace('.', ',')}/cart`);
                    remove(cartRef).catch((error) => {
                        console.error("Error removing item from Firebase:", error);
                    });
                    toast.success( "Payment Confirmed! expect a email soon containing shipping information/tour tickets", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        color: '#E9204F',
                        backgroundColor: '#2C2C2C',
                    }
                    });

                } else {
                    setMessage("User information is missing.");
                }

            }
            else{
                setMessage("Payment failed for an unknown reason.");
            }
        });

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element"  />
            <button 
            disabled={isProcessing || !stripe || !elements} 
            id="submit" 
            style={{ 
                display: 'block', 
                margin: '20px 0 0px 0', 
                backgroundColor: '#E9204F', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '5px' 
            }}
            >
            <span id="button-text">
                {isProcessing ? "Processing ... " : "Pay now"}
            </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}