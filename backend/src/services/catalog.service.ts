import { Catalog } from "../models/Catalog";

export const getCatalog = async () => {
  return Catalog.find({isAvailable: true}).sort({ price: 1 });
};
