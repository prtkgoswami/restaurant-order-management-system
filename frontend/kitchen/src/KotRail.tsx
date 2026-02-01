import { useRef, useEffect } from "react";
import useOrders from "./hooks/useOrders";
import OrderTicket from "./components/OrderTicket";

const KotRail = () => {
  const { orders, isLoading, error, changeOrderStatus } = useOrders();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel);
    return () => el.removeEventListener("wheel", onWheel);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <h2 className="text-2xl leading-relaxed">
          Fetching Orders <span className="animate-bounce">.</span>{" "}
          <span className="animate-bounce">.</span>{" "}
          <span className="animate-bounce">.</span>
        </h2>
      </div>
    );
  }

  if (error && error.name === "AbortError") {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <h2 className="text-2xl leading-relaxed">
          ERR:: Response is taking too long...
        </h2>
      </div>
    );
  } else if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <h2 className="text-2xl leading-relaxed">
          ERR:: Something went wrong. Please Wait
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      {orders && (
        <p className="text-center text-lg mb-3">Orders Left: {orders.length}</p>
      )}
      <div
        ref={scrollRef}
        className="h-max w-full flex items-start gap-x-8 overflow-x-auto px-4 py-4"
      >
        {(!orders || orders.length === 0) && (
          <h2 className="text-2xl leading-relaxed text-zinc-400">
            No orders yet. Please Wait
          </h2>
        )}
        {orders &&
          orders.map((order) => (
            <OrderTicket
              key={order.id}
              order={order}
              changeOrderStatus={changeOrderStatus}
            />
          ))}
      </div>
    </div>
  );
};

export default KotRail;
