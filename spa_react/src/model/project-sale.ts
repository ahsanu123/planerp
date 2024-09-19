import { BaseModel } from "./base-model";
import { MarketPlaceType } from "./marketplace";

export interface ProjectSaleModel extends BaseModel {
  projectId: number,
  marketPlace: MarketPlaceType,
  listedPrice: number,
  minimumPrice: number,
  capitalPrice: number,
  readyStock: number,
  buildableStock: number,
}
