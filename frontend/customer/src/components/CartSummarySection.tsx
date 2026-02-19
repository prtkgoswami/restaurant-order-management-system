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
    <div className="h-max md:h-30 w-full md:w-[95%] border border-gray-300 shadow-xl shadow-gray-800/20 rounded-tr-lg rounded-bl-lg flex flex-col md:flex-row text-zinc-800 items-center relative overflow-hidden">
      <div className="w-full h-full flex grow">
        <div className="h-30 md:h-full w-40 flex justify-center items-center bg-zinc-200">
          <img src="/vector-pizza.png" width="90%" />
        </div>
        <div className="grow h-full flex flex-col justify-between px-3 py-2">
          <div>
            <p className="text-2xl max-w-96 truncate">{item.name}</p>
            <p className="text-lg">Price: $ {item.price.toFixed(2)}</p>
          </div>
          <div className="flex gap-2 items-center mt-2">
            <button
              type="button"
              className="rounded-full bg-gray-300/60 hover:bg-gray-300 transition-colors ease-in-out duration-200 w-6 h-6 flex justify-center items-center"
              onClick={() => onDecreaseQty(item.id)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>

            <p className="text-xl">{item.quantity}</p>

            <button
              type="button"
              className="rounded-full bg-gray-300/60 hover:bg-gray-300 transition-colors ease-in-out duration-200 w-6 h-6 flex justify-center items-center"
              onClick={() => onIncreaseQty(item.id)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-row-reverse md:flex-col justify-between items-end px-3 py-2">
        <p className="text-2xl font-semibold">
          <span className="text-lg mr-1 font-normal">$</span>
          {(item.quantity * item.price).toFixed(2)}
        </p>

        <button
          type="button"
          className="w-10 h-10 rounded-md flex justify-center items-center text-white bg-red-600 opacity-40 hover:opacity-100 transition-opacity duration-200 ease-in-out"
          onClick={() => onRemoveItem(item.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
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
    <div className="h-full grow bg-zinc-100 px-3 md:px-10 py-8 overflow-y-auto">
      <div className="flex items-end justify-between px-2 py-2 md:px-8 md:py-4">
        <h2 className="text-xl md:text-4xl md:font-light text-gray-800">
          Cart Summary
        </h2>
        <h4 className="text-base md:text-xl text-gray-500">
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
