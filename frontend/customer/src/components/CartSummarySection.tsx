import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/cart";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <div className="h-30 w-[95%] border border-gray-600 shadow-xl shadow-gray-800/20 rounded-tr-lg rounded-bl-lg flex text-zinc-800 items-center relative">
      <div className="h-full shrink-0 w-30 bg-zinc-500"></div>

      <div className="grow h-full p-4 flex flex-col justify-between max-w-96">
        <p className="text-2xl truncate">{item.name}</p>
        <p className="text-lg">Price: $ {item.price.toFixed(2)}</p>
      </div>

      <div className="h-[80%] border border-zinc-400/60" />

      <div className="flex flex-col items-center w-26 h-[80%] shrink-0">
        <p className="text-center uppercase">Qty</p>
        <div className="flex gap-2 grow justify-center items-center">
          <button
            type="button"
            className=""
            onClick={() => onDecreaseQty(item.id)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <p className="text-xl">{item.quantity}</p>

          <button
            type="button"
            className=""
            onClick={() => onIncreaseQty(item.id)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className="h-[80%] border border-zinc-400/60" />

      <div className="flex flex-col w-26 h-[80%]">
        <p className="text-center uppercase">Total</p>
        <p className="grow flex justify-center items-center text-xl">
          $ {(item.quantity * item.price).toFixed(2)}
        </p>
      </div>

      <div className="h-[80%] border border-zinc-400/60" />

      <button
        type="button"
        className="px-2 text-red-600 hover:text-red-700"
        onClick={() => onRemoveItem(item.id)}
      >
        <FontAwesomeIcon icon={faTrash} size="xl" />
      </button>
    </div>
  );
};

const CartSummarySection = () => {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const handleIncreaseQty = (id: string) => {
    increaseQuantity(id);
  };

  const handleDecreaseQty = (id: string) => {
    decreaseQuantity(id);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  return (
    <div className="h-full grow bg-zinc-100 px-10 py-8 overflow-y-auto">
      <div className="flex items-end justify-between px-8 py-4">
        <h2 className="text-4xl font-light text-gray-800">Cart Summary</h2>
        <h4 className="text-xl text-gray-500">
          {items.reduce((acc, item) => acc + item.quantity, 0)} Items
        </h4>
      </div>
      <div className="border border-red-500" />
      <div className="flex flex-col gap-4 py-5 items-center">
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
    </div>
  );
};

export default CartSummarySection;
