import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import type { Order, Pricing } from "../types/order";
import useOrder from "../hooks/useOrder";
import { useNavigate } from "react-router-dom";

const CONVENIENCE_FEE_RATE = 0.1;
const TAX_RATE = 0.055;

const SummarySection = ({ pricingData }: { pricingData: Pricing }) => {
  return (
    <section className="w-full md:w-[80%]">
      <h4 className="text-xl font-light uppercase">Summary</h4>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex justify-between items-center px-3">
          <p>Price</p>
          <p>$ {pricingData.totalMRP.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center px-3">
          <p>Convenience Fee ({pricingData.convenienceFeeRate * 100}%)</p>
          <p>+ $ {pricingData.convenienceFeeAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center px-3">
          <p>Tax ({pricingData.taxRate * 100}%)</p>
          <p>+ $ {pricingData.taxAmount.toFixed(2)}</p>
        </div>
        <div className="w-full border border-zinc-100/30" />
        <div className="flex justify-between items-end px-3">
          <p>Final Price</p>
          <p className="text-xl">= $ {pricingData.finalAmount.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
};

const OrderDetails = ({
  name,
  contactNumber,
  setName,
  setContactNumber,
}: {
  name: string;
  contactNumber: string;
  setName: (val: string) => void;
  setContactNumber: (val: string) => void;
}) => {
  return (
    <section className="w-full md:w-[80%]">
      <h4 className="text-xl font-light uppercase">Customer Details</h4>
      <div className="flex flex-col gap-1 px-3 mt-3">
        <label className="text-sm uppercase">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-zinc-100 text-lg px-2 py-1 rounded-lg"
        />
        <label className="text-sm uppercase mt-4">
          Contact Number <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="contact-number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="border border-zinc-100 text-lg px-2 py-1 rounded-lg"
        />
      </div>
    </section>
  );
};

const PaymentSection = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const { totalAmount, items } = useCart();
  const { order, isLoading, error, placeOrder } = useOrder();
  const navigate = useNavigate();

  const pricing: Pricing = useMemo(() => {
    const convenienceFee = CONVENIENCE_FEE_RATE * totalAmount;
    const tax = TAX_RATE * totalAmount;
    const finalPrice = totalAmount + convenienceFee + tax;
    return {
      totalMRP: totalAmount,
      convenienceFeeRate: CONVENIENCE_FEE_RATE,
      convenienceFeeAmount: convenienceFee,
      taxRate: TAX_RATE,
      taxAmount: tax,
      finalAmount: finalPrice,
    };
  }, [totalAmount]);

  const handlePlaceOrder = () => {
    const payload: Order = {
      items: items.map((item) => ({
        pizzaId: item.id,
        ...item,
      })),
      customer: {
        name,
        contactNumber,
      },
      pricing,
    };
    placeOrder(payload);
  };

  useEffect(() => {
    if (order && order.id) {
      navigate(`/order/${order.id}`);
    }
  }, [order, order?.id]);

  return (
    <div className="h-full w-full md:w-2/5 p-5 flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center gap-8">
        <SummarySection pricingData={pricing} />
        <OrderDetails
          name={name}
          contactNumber={contactNumber}
          setName={setName}
          setContactNumber={setContactNumber}
        />
      </div>
      <button
        type="button"
        className="text-zinc-100 bg-green-600 hover:bg-green-700 disabled:bg-zinc-500 text-lg px-5 py-3 rounded-lg w-[60%] mt-5"
        onClick={handlePlaceOrder}
        disabled={isLoading || !name || !contactNumber}
      >
        Place Order
      </button>
    </div>
  );
};

export default PaymentSection;
