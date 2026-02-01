import { useEffect } from "react";
import useOrder from "../hooks/useOrder";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { type Order } from "../types/order";
import OrderReceipt from "../components/OrderReceipt";
import OrderStatusSection from "../components/OrderStatusSection";

const Order = () => {
  const { order, isLoading, error, fetchOrder, subscribeToOrder } = useOrder();
  const { orderId } = useParams();

  useEffect(() => {
    if (!orderId) return;

    fetchOrder(orderId);
    subscribeToOrder(orderId);
  }, [orderId]);

  // Polling for Updates
  // useEffect(() => {
  //   if (!orderId || order?.status === "COMPLETED") {
  //     return;
  //   }
  //   const timer = setInterval(() => {
  //     fetchOrder(orderId, true);
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [orderId, order?.status]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} size="5x" spin />
        <h2 className="text-3xl text-zinc-100 mt-8">
          Fetching Order Details ...
        </h2>
      </div>
    );
  }

  if (!order || error) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <FontAwesomeIcon icon={faXmarkCircle} size="5x" />
        <h2 className="text-3xl text-zinc-100 mt-8">
          Err:: Could not fetch Order Details
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col-reverse md:flex-row justify-center items-center ">
      <OrderReceipt order={order} />
      <OrderStatusSection
        currentStatus={order.status ?? "PLACED"}
        lastUpdatedAt={order.updatedAt}
      />
    </div>
  );
};

export default Order;
