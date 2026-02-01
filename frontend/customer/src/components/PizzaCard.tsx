import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Pizza } from "../types/catalog";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

type Props = {
  item: Pizza;
};

const PizzaCard = ({ item }: Props) => {
  const { addItem, getItem } = useCart();
  const { name, description, price } = item;
  const cartData = getItem(item.id);
  const quantity = cartData?.quantity ?? 0;

  const AddItemClick = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };

  return (
    <div className="flex flex-col h-[280px] md:h-[350px] md:w-[240px] rounded-tr-lg rounded-bl-lg overflow-hidden shadow-xl shadow-gray-800/40">
      <div className="grow flex justify-center items-center bg-zinc-200">
        <img src="/vector-pizza.png" width="90%" />
      </div>
      <div className="px-3 py-2 bg-zinc-100 text-zinc-900 h-30 flex flex-col">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm grow">{description}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold">
            $ {Number(price.toFixed(2)).toString()}
          </p>
          <button
            type="button"
            className={`h-8 aspect-square flex justify-center items-center rounded-md ${
              quantity === 0
                ? "bg-zinc-900 hover:bg-zinc-600"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors ease-in-out duration-200 text-zinc-100`}
            onClick={AddItemClick}
          >
            {quantity ? <p>{quantity}</p> : <FontAwesomeIcon icon={faPlus} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
