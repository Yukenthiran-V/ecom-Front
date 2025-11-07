import { useRazorpay } from "react-razorpay";
import axios from "axios";
import { config } from "../api/Api";

const base_url = config.base_url;

export const usePaymentGateway = () => {
  const { Razorpay } = useRazorpay();

  // ✅ Reusable payment handler function
  const handlePayment = async (apiKey, productDetails = {}, userDetails={}) => {
    try {
      if (!apiKey) {
        alert("API Key missing!");
        return;
      }

      // 1️⃣ Create order on backend
      const orderResponse = await axios.post(
        `${base_url}/payment/order`,
        { amount: productDetails.product_price },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
          },
        }
      );

      const order = orderResponse.data;

      // 2️⃣ Configure Razorpay options
      const options = {
        key: order.apiKey, // Razorpay key from backend
        amount: order.amount,
        currency: "INR",
        name: "My App",
        description: "Test Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verify = await axios.post(
              `${base_url}/payment/verify`,
              response,
              {
                headers: {
                  "Authorization": `Bearer ${apiKey}`,
                },
              }
            );

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
          name: userDetails.first_name+" "+userDetails.last_name,
          email: userDetails.email ,
          contact: userDetails.phone_number,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 3️⃣ Open Razorpay popup
      const rzp = new Razorpay(options);
      rzp.open();

      // 4️⃣ Handle payment failure
      rzp.on("payment.failed", function (response) {
        console.error(response.error);
        alert("❌ Payment failed. Please try again.");
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while initiating payment.");
    }
  };

  return { handlePayment };
};
