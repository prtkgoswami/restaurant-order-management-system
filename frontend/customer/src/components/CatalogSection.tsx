import useCatalog from "../hooks/useCatalog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import PizzaCard from "./PizzaCard";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import CartSection from "./CartSection";

const CatalogContent = () => {
  const { items, isLoading, error } = useCatalog();

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <FontAwesomeIcon
          icon={faSpinner}
          size="5x"
          className="text-blue-400"
          spin
        />
        <h2 className="text-2xl text-zinc-800">Fetching Catalog ...</h2>
      </div>
    );
  }

  if (error && error.name === "AbortError") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <h2 className="text-4xl font-semibold text-zinc-400 select-none">
          Err:: Server took too long to respond
        </h2>
      </div>
    );
  } else if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <h2 className="text-4xl font-semibold text-zinc-400 select-none">
          ERR:: Could not fetch Catalog.
        </h2>
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-fit">
        {items.map((item) => (
          <PizzaCard key={item.id} item={item} />
        ))}
      </div>
      <div className="h-18 md:h-5 w-full" />
    </div>
  );
};

const MobileCartBar = ({ onClick }: { onClick: () => void }) => {
  const { totalItems, totalAmount } = useCart();
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-0 left-0 w-full h-15 z-100 flex justify-between items-center bg-zinc-900 hover:bg-amber-500 text-zinc-200 hover:text-zinc-900 px-4"
    >
      <p className="text-lg font-semibold">
        <span className="mr-4">
          <FontAwesomeIcon icon={faCartShopping} size="lg" />
        </span>
        {totalItems} Pizzas
      </p>
      <p className="text-lg font-semibold">
        $ {Number(totalAmount.toFixed(2)).toString()}
      </p>
    </button>
  );
};

const MobileCart = ({
  isVisible = false,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  if (!isVisible) return <></>;

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-zinc-900 z-150 pt-5">
      <button
        onClick={onClose}
        className="bg-red-500 hover:bg-red-600 transition-colors duration-200 ease-in-out rounded-full w-10 h-10 flex justify-center items-center absolute top-5 right-5 z-50"
      >
        <FontAwesomeIcon icon={faXmark} size="lg" />
      </button>
      <CartSection />
    </div>
  );
};

const CatalogSection = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="w-full md:w-3/4 flex justify-center bg-zinc-200 overflow-y-auto py-5 px-3 relative">
      <CatalogContent />
      <MobileCartBar onClick={() => setShowMobileMenu(true)} />
      <MobileCart
        isVisible={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />
    </div>
  );
};

export default CatalogSection;
