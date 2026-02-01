import CatalogSection from "../components/CatalogSection";
import CartSection from "../components/CartSection";

const Catalog = () => {
  return (
    <div className="flex w-full h-screen">
      <CatalogSection />
      <div className="hidden md:block w-1/4">
        <CartSection />
      </div>
    </div>
  );
};

export default Catalog;
