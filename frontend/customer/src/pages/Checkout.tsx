import React from "react";
import CartSummarySection from "../components/CartSummarySection";
import PaymentSection from "../components/PaymentSection";

const Checkout = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen">
      <CartSummarySection />
      <PaymentSection />
    </div>
  );
};

export default Checkout;
