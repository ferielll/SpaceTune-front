import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useUser } from "../../../hooks/useUser";
import "./style.css"
import { useNavigate } from "react-router-dom";
export const CheckoutForm = (products , price) => {
  const {user} = useUser();
  let total =products.price+75
  const navigate = useNavigate();
const createorder =async () =>{
  console.log("this is total" ,total)

  try {
    const response = await axios.post(
      "http://localhost:3000/spacetune/api/order/create/",
      {order:{userID: user._id,
        items: products.products.map(product=> product._id),
        total : total}
        
      }
    );
    localStorage.setItem("cart", JSON.stringify([]));
    navigate('/app/shop/thankyou')
  } catch (error) {
    console.log("Probleme  create order", error);
  }
}



  const stripe = useStripe();
  const elements = useElements();
 
  console.log(price,products)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        
        const response = await axios.post(
          "http://localhost:3000/spacetune/api/order/pay/",
          {
            amount: total,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
          createorder();
          
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    
    
    <center> <br></br><form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h1 >Payment with credit card</h1>
      <h2>In this order you will pay ${products.price+75}</h2>
      <h3>Please enter your card information to complete your order</h3>


      <CardElement />
      <br></br>
      <button class ="pay">Pay</button>
    </form></center>
  );
};