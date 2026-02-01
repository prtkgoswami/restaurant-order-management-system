import { useEffect, useState } from "react";
import type { Order } from "../types/order";
import { socket } from "../lib/socket";

type HookResponse = {
  order: Order | null;
  isLoading: boolean;
  error: Error | undefined;
  placeOrder: (order: Order) => void;
  fetchOrder: (orderId: string, silent?: boolean) => void;
  subscribeToOrder: (orderId: string) => void;
};

const useOrder = (): HookResponse => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const placeOrder = async (order: Order) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong");
      }

      setOrder(data);
    } catch (err) {
      console.error("Failed to create order", (err as Error).message);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrder = async (orderId: string, silent = false) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }
      const response = await fetch(`http://localhost:4000/orders/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      console.error("Failed to fetch order", err);
      setError(err as Error);
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  };

  const subscribeToOrder = (orderId: string) => {
    if (!socket.connected) {
      socket.connect();
      socket.emit("register_client", { role: "customer" });
    }

    socket.emit("join_order", orderId);

    socket.on("order_status_updated", (payload) => {
      setOrder((prev) =>
        prev
          ? {
              ...prev,
              status: payload.status,
              updatedAt: payload.updatedAt,
            }
          : prev
      );
    });
  };

  useEffect(() => {
    return () => {
      socket.off("order_update_status");
    };
  }, []);

  return {
    order,
    isLoading,
    error,
    placeOrder,
    fetchOrder,
    subscribeToOrder,
  };
};

export default useOrder;
