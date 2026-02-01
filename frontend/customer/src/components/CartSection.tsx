import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/cart";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type CartRowProps = {
  item: CartItem;
  onIncreaseQty: (id: string) => void;
  onDecreaseQty: (id: string) => void;
  onRemoveItem: (id: string) => void;
};

const CartRow = ({
  item,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem,
}: CartRowProps) => {
  const { id, name, quantity, price } = item;

  const handleIncreaseQtyClick = () => {
    onIncreaseQty(id);
  };

  const handleDecreaseQtyClick = () => {
    onDecreaseQty(id);
  };

  const handleRemoveClick = () => {
    onRemoveItem(id);
  };

  return (
    <div className="flex gap-2 items-center justify-between rounded-md w-[96%] bg-zinc-100/20 backdrop-blur-lg p-3">
      <div className="grow flex flex-col gap-1">
        <p className="text-lg text-zinc-100 truncate max-w-56">{name}</p>
        <p className="text-sm text-zinc-300">
          Price: $ {Number(price.toFixed(2)).toString()} | Qty: {quantity}
        </p>
        <div className="flex mt-2">
          <button
            className="w-14 h-6 rounded-tl-md rounded-bl-md bg-zinc-400 hover:bg-zinc-100 transition-colors duration-200 ease-in-out text-zinc-700 flex justify-center items-center"
            onClick={handleDecreaseQtyClick}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button
            className="w-14 h-6 rounded-tr-md rounded-br-md bg-zinc-400 hover:bg-zinc-100 transition-colors duration-200 ease-in-out text-zinc-700 flex justify-center items-center"
            onClick={handleIncreaseQtyClick}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className="flex flex-col h-full justify-between items-end">
        <p className="text-lg text-zinc-100">
          $ {Number((quantity * price).toFixed(2)).toString()}
        </p>
        <button
          className="w-10 h-10 rounded-md bg-red-400/60 hover:bg-red-600 hover:text-zinc-200 transition-colors duration-200 ease-in-out text-zinc-700 flex justify-center items-center"
          onClick={handleRemoveClick}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

const CartSection = () => {
  const {
    items,
    totalAmount,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const handleIncreaseQty = (id: string) => {
    increaseQuantity(id);
  };

  const handleDecreaseQty = (id: string) => {
    decreaseQuantity(id);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-2 shadow-lg shadow-zinc-800">
      <h4 className="text-xl mt-3">Cart</h4>
      <div className="grow flex flex-col gap-4 w-full overflow-y-auto items-center">
        {items.length === 0 && (
          <div className="mt-5">
            <p className="text-lg text-center text-zinc-400">Cart is Empty</p>
            <p className="text-center text-zinc-400">Try adding a Pizza</p>
          </div>
        )}
        {items.map((item) => (
          <CartRow
            key={item.id}
            item={item}
            onIncreaseQty={handleIncreaseQty}
            onDecreaseQty={handleDecreaseQty}
            onRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
      <div className="w-full flex flex-col items-center gap-2 pb-4">
        <div className="border border-zinc-100/20 w-[96%]" />
        <div className="flex w-[94%] px-3 py-2 justify-between mb-2">
          <p className="text-lg">Total</p>
          <p className="text-lg">
            $ {Number(totalAmount.toFixed(2)).toString()}
          </p>
        </div>
        <div className="flex gap-2 w-[96%]">
          <button
            type="button"
            className="cursor-pointer w-[80%] py-2 rounded-lg bg-green-500 hover:bg-green-600 disabled:bg-zinc-500 text-zinc-100 font-semibold text-lg"
            onClick={handleCheckoutClick}
            disabled={items.length == 0}
          >
            Checkout
          </button>
          <button
            type="button"
            className="cursor-pointer w-[80%] py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-zinc-500 text-zinc-100 font-semibold text-lg"
            onClick={handleClearCart}
            disabled={items.length == 0}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
