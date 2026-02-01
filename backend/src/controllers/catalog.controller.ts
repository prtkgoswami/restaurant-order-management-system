import { Request, Response } from "express";
import * as CatalogService from "../services/catalog.service";

export const getCatalog = async (_: Request, res: Response) => {
  const catalog = await CatalogService.getCatalog();
  res.status(200).json(catalog);
};
