import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CheckoutForm = ({ user, shipping }) => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);

  useEffect(() => {
    if (shipping && useDefaultAddress) {
      setAddress(shipping.address || "");
      setCity(shipping.city || "");
      setState(shipping.state || "");
      setZipCode(shipping.zipCode || "");
    }
  }, [shipping, useDefaultAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error("Stripe Error:", error);
      setLoading(false);
      return;
    }

    const paymentDetails = {
      paymentMethodID: paymentMethod.id,
      total: (location.state.total * 100).toFixed(0),
      orders: location.state.orders,
      shipping: {
        address,
        state,
        city,
        zipCode
      },
      userID: user.id,
      email: user.email,
      firstName,
      lastName
    };

    try {
      await fetch("http://localhost:8080/api/payment/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentDetails),
      });

      nav('/')
    } catch (error) {
      console.log("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 to-purple-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md m-10">
        <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center">Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none" />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none" />
          </div>

          <input type="text" placeholder="Address Line 1" value={address} onChange={(e) => setAddress(e.target.value)} disabled={useDefaultAddress} className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none disabled:opacity-50" />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} disabled={useDefaultAddress} className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none disabled:opacity-50" />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} disabled={useDefaultAddress} className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none disabled:opacity-50" />
          <input type="text" placeholder="Postal Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} disabled={useDefaultAddress} className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none disabled:opacity-50" />
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={useDefaultAddress} onChange={() => setUseDefaultAddress(!useDefaultAddress)} className="w-4 h-4" />
            <label className="text-pink-600 font-medium">Use Default Address</label>
          </div>

          <div className="border-2 border-pink-300 rounded-lg p-4 bg-pink-50">
            <CardElement className="p-2 bg-white rounded-md shadow-inner" />
          </div>

          <button type="submit" disabled={!stripe || loading} className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all ${loading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"}`}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
          
          <Link to='/account/cart'>
            <button type="button" className="w-full px-6 py-3 rounded-lg font-semibold transition-all">Go back</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
