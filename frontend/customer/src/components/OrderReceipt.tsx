import type { Order } from "../types/order";

const OrderReceipt = ({ order }: { order: Order }) => {
  return (
    <section className="w-[95%] md:w-full h-full flex items-center justify-center py-6 md:py-0">
      <div className="w-[450px] bg-zinc-200 text-zinc-700 flex flex-col items-center gap-4 font-mono px-5 py-8 shadow-2xl shadow-black">
        <h3 className="text-xl text-center">Pizza Express</h3>
        <div className="w-full">
          <p className="font-semibold text-center">Invoice</p>
          <div className="w-full border border-dashed border-zinc-800" />
          <p>Order No.: {order.id}</p>
          <p>
            Date:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "Unknown"}
          </p>
          <div className="w-full border border-dashed border-zinc-800" />
        </div>
        <div className="w-full">
          <p>Customer Name: {order.customer.name}</p>
          <p>Contact Number: {order.customer.contactNumber}</p>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-[1fr_80px_25px_80px] gap-x-2">
            <p>Item</p>
            <p className="text-center">Price</p>
            <p className="text-center">Qty</p>
            <p className="text-right">Amount</p>
          </div>
          {order.items.map((item) => (
            <div
              key={item.id ?? item.pizzaId}
              className="grid grid-cols-[1fr_80px_25px_80px] gap-x-2"
            >
              <p className="max-w-80">{item.name}</p>
              <p className="text-center">${item.price.toFixed(2)}</p>
              <p className="text-center">{item.quantity}</p>
              <p className="text-right">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="w-full border border-zinc-800 my-3" />
          <div className="w-full grid grid-cols-[1fr_100px]">
            <p>Subtotal</p>
            <p className="text-right">${order.pricing.totalMRP.toFixed(2)}</p>
            <p>
              Convenience Fee (
              {(order.pricing.convenienceFeeRate * 100).toFixed(2)}%)
            </p>
            <p className="text-right">
              ${order.pricing.convenienceFeeAmount.toFixed(2)}
            </p>
            <p>Tax ({(order.pricing.taxRate * 100).toFixed(2)}%)</p>
            <p className="text-right">$ {order.pricing.taxAmount.toFixed(2)}</p>
            <p>Bill Total</p>
            <p className="text-right font-bold">
              ${order.pricing.finalAmount.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-center">Thank you for Choosing Pizza Express!</p>
          <p className="text-center">Please visit again</p>
        </div>
      </div>
    </section>
  );
};

export default OrderReceipt;
