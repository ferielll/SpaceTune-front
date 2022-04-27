import {React,useEffect,useState} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51ITzQpDWjPU5uegJMN7UTYTMl1pOurJkcdGkX236eN7BRzOFAo6hWrpfrn7lG7l1wx9i3PyxCFonUQGduHA7ZNlI00Hya6Op7T";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  const location = useLocation();
    
    const products  = location.state.products;
    const [price,setPrice] = useState(location.state.price);
    
    console.log(location.state);
  return (
    <Elements stripe={stripeTestPromise}>
    
      <CheckoutForm products ={products} price={price}/>
    </Elements>
  );
};

export default Stripe;