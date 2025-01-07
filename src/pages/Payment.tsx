import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import useLogin from "../Auth/functions";
import { useLocation } from "react-router";
import axios from "axios";

const Stripe = loadStripe("pk_test_51Qe5S5CO8wO6DXWdN3KxfnZkuMPBmDe7InvPf6S3IqFSCipI8osSsz2KDm3b8stNDa7jub7Jxw3hyrwIVmCwUzRv00jhdmhbtX")

function Payment() {
  const [clientSecret, setClientSecret] = useState("");


  const location = useLocation();
  const { amount } = location.state || {};

  
  const {
    user,
  } = useLogin();

  useEffect(() => {
    axios.post("https://stripepaymentintentrequest-n7ggeoi6nq-uc.a.run.app", {
        email: user?.email,
        amount: amount,
        }).then((result) => {
        if (result.status === 200) {
            setClientSecret(result.data.paymentIntent);
        } else {
            console.error("Failed to fetch payment intent");
        }
        }).catch((error) => {
        console.error("Error:", error);
        });


  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#000000" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>React Stripe and the Payment Element</h1>
      {clientSecret && Stripe && (
        <Elements stripe={Stripe} options={{ clientSecret }}>
          <div style={{ width: "100%", maxWidth: "500px", padding: "20px", backgroundColor: "#fff", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
            <CheckoutForm />
          </div>
        </Elements>
      )}
    </div>
  );
}

export default Payment;