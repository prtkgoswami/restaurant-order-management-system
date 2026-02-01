import { OrderStatus, type Order } from "../types/order";

const OrderTicket = ({
  order,
  changeOrderStatus,
}: {
  order: Order;
  changeOrderStatus: (
    orderId: string,
    nextStatus: (typeof OrderStatus)[number],
  ) => void;
}) => {
  const currentIndex = OrderStatus.indexOf(order.status ?? "PLACED");

  const changeStatus = (nextStatus: (typeof OrderStatus)[number]) => {
    console.log("Change Order status", order.id, nextStatus);
    if (!order.id || !nextStatus) return;

    changeOrderStatus(order.id, nextStatus);
  };

  return (
    <div className="w-[350px] shrink-0 bg-zinc-200 text-zinc-700 flex flex-col items-center gap-2 font-mono px-5 py-8 shadow-2xl shadow-black">
      <p>KOT</p>
      <div className="w-full border border-dashed border-zinc-800" />
      <p className="font-bold">Invoice Details</p>
      <div className="w-full flex justify-between items-center">
        <p>Order No.</p>
        <p>{order.id}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Total Amount</p>
        <p>$ {order.pricing.finalAmount.toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Date</p>
        <p>
          {order.createdAt
            ? new Date(order.createdAt).toLocaleString()
            : "Unknown"}
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Customer Name</p>
        <p>{order.customer.name}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Customer Contact</p>
        <p>{order.customer.contactNumber}</p>
      </div>
      <div className="w-full border border-dashed border-zinc-800" />
      <div className="w-full">
        <div className="grid grid-cols-[25px_1fr_25px] gap-x-5">
          <p>SrNo</p>
          <p>Name</p>
          <p className="text-center">Qty</p>
        </div>
        {order.items.map((item, i) => (
          <div
            key={item.pizzaId}
            className="grid grid-cols-[25px_1fr_25px] gap-x-5"
          >
            <p className="text-center">{i + 1}</p>
            <p className="max-w-80">{item.name}</p>
            <p className="text-center">{item.quantity}</p>
          </div>
        ))}
        <div className="w-full border border-zinc-800 my-3" />
        <div className="w-full flex justify-between items-center font-semibold px-2">
          <p>Total Qty</p>
          <p>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
        </div>
      </div>
      <div className="w-full border border-dashed border-zinc-800" />
      <p className="font-bold">Order Status</p>
      <div className="w-full grid grid-cols-3 gap-x-3">
        {OrderStatus.slice(1).map((status, i) => (
          <button
            key={status}
            type="button"
            className={`px-2 py-1 bg-blue-500 text-zinc-100 disabled:bg-zinc-400 cursor-pointer rounded-md`}
            onClick={() => changeStatus(status)}
            disabled={i + 1 <= currentIndex}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderTicket;
