import { useEffect, useState } from "react";
import type { Order, OrderStatus } from "../types/order";
import { socket } from "../lib/socket";

type HookResponse = {
  orders: Order[];
  isLoading: boolean;
  error?: Error;
  fetchOrders: (silent?: boolean) => void;
  changeOrderStatus: (
    orderId: string,
    nextStatus: (typeof OrderStatus)[number],
  ) => void;
};

const useOrders = (): HookResponse => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  const fetchOrders = async (silent = false) => {
    const abortController = new AbortController();
    const timeOutId = setTimeout(() => abortController.abort(), 5000);

    try {
      if (!silent) setIsLoading(true);

      const response = await fetch("http://localhost:4000/orders/", {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      clearTimeout(timeOutId);
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      clearTimeout(timeOutId);
      if ((err as Error).name === "AbortError") {
        console.error("Request Timed Out");
      } else {
        console.error("Failed to fetch orders", err);
      }
      setError(err as Error);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const changeOrderStatus = async (
    orderId: string,
    nextStatus: (typeof OrderStatus)[number],
  ) => {
    try {
      const response = await fetch(
        `http://localhost:4000/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: nextStatus }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      if (nextStatus === "COMPLETED") {
        void fetchOrders(true);
      }
    } catch (err) {
      console.error("Failed to Update Order", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      await fetchOrders();

      if (!isMounted) {
        return;
      }

      if (!socket.connected) {
        socket.connect();
        socket.emit("register_client", { role: "kitchen" });
      }

      socket.on("order_created", ({ order }) => {
        setOrders((prev) => {
          if (prev.some((o) => o.id === order.id)) return prev;
          return [...prev, order];
        });
      });

      socket.on("order_status_updated", ({ orderId, status, updatedAt }) => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status, updatedAt } : order,
          ),
        );
      });
    };

    init();

    return () => {
      isMounted = false;
      socket.off("order_created");
      socket.off("order_status_updated");
    };
  }, []);

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    changeOrderStatus,
  };
};

export default useOrders;
