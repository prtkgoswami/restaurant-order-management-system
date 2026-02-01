import { createContext, useContext, useMemo, useState } from "react";
import type { Cart, CartItem } from "../types/cart";

type CartContextValue = {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  getItem: (id: string) => CartItem;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, setCartState] = useState<Cart>({});

  const addItem = (item: Omit<CartItem, "quantity">) => {
    console.log("Adding Item", item);
    setCartState((prev) => {
      const currItem = cartState[item.id];

      return {
        ...prev,
        [item.id]: currItem
          ? { ...currItem, quantity: currItem.quantity + 1 }
          : { ...item, quantity: 1 },
      };
    });
  };

  const getItem = (id: string) => {
    return cartState[id];
  };

  const removeItem = (id: string) => {
    setCartState((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return { ...copy };
    });
  };

  const clearCart = () => {
    setCartState({});
  };

  const increaseQuantity = (id: string) => {
    setCartState((prev) => {
      const currItem = prev[id];

      return {
        ...prev,
        [id]: {
          ...currItem,
          quantity: currItem.quantity + 1,
        },
      };
    });
  };

  const decreaseQuantity = (id: string) => {
    setCartState((prev) => {
      const currItem = prev[id];

      if (currItem.quantity === 1) {
        removeItem(id);
      }

      return {
        ...prev,
        [id]: {
          ...currItem,
          quantity: currItem.quantity - 1,
        },
      };
    });
  };

  const items = Object.values(cartState);

  const totalAmount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const values = {
    items,
    totalAmount,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem,
    removeItem,
    clearCart,
    getItem,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be called from within CartProvider");
  }

  return ctx;
};
