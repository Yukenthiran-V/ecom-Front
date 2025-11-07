import React from "react";
import { useEffect,useState } from "react";
import { useRazorpay } from "react-razorpay";
import axios from "axios";
import { config } from "../../api/Api";

const PaymentGateway = () => {
  const {Razorpay} = useRazorpay();

  const base_url = config.base_url;



  const handlePayment = async () => {
    try {
      if(!apiKey){
        return ;
      }
      // 1️⃣ Create order on your backend
      const orderResponse = await fetch(`${base_url}/payment/order`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ amount: 500 }) // amount in paise (₹5)
      }
      )
      const data = await orderResponse.json();
      // 2️⃣ Configure Razorpay options
      const options = {
        key: data.apiKey, // Replace with your actual Razorpay key
        amount: data.amount,
        currency: "INR",
        name: "My App",
        description: "Test Payment",
        order_id: data.id,
        handler: async function (response) {
          try {
            const verify = await fetch(`${base_url}/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
              },
              body: JSON.stringify(response),
            });
            if (verify.data.success) {
              alert("✅ Payment Successful!");
            } else {
              alert("❌ Payment Verification Failed!");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 3️⃣ Create Razorpay instance and open
      const rzp = new Razorpay(options);
      rzp.open();

      // Optional: handle payment failure
      rzp.on("payment.failed", function (response) {
        console.error(response.error);
        alert("❌ Payment failed. Please try again.");
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while initiating payment.");
    }
  };


};

export default PaymentGateway;
