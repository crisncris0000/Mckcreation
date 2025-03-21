import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const jwt = localStorage.getItem('jwt')
  const [user, setUser] = useState()
  const nav = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(!jwt) {
      nav('/account/login')
    }

    if(location.state == null) {
      nav('/')
    }

    setUser(jwtDecode(jwt))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    // Create a Payment Method based on user input
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    console.log("Payment Method Created:", paymentMethod);


    const paymentDetails = {
      paymentMethodId: paymentMethod.id,
      total: location.state,
      shippingDTO: {
        address, 
        state,
        city,
        zipCode
      },
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    try {
      const response = await fetch("http://localhost:8080/api/payment/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentDetails),
    });

    const data = await response.json();
    console.log("Server Response:", data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 to-purple-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center">Checkout</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name and Last Name Inputs */}
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none"
            />
          </div>

          {/* Address Inputs */}
          <input
            type="text"
            placeholder="Address Line 1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none"
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full p-3 rounded-lg border border-pink-300 bg-pink-50 focus:outline-none"
          />

          {/* Card Element */}
          <div className="border-2 border-pink-300 rounded-lg p-4 bg-pink-50">
            <CardElement className="p-2 bg-white rounded-md shadow-inner" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all ${
              loading
                ? "bg-pink-400 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          
          {/* Back to Cart Button */}
          <Link to='/account/cart'>
            <button
              type="button"
              disabled={!stripe || loading}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all`}
            >
              Go back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
