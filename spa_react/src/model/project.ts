import { BaseModel } from "./base-model";

export interface Project extends BaseModel {
  bomId: number,
  resourceDocumentId: number,
  procedureId: number,
  logId: number,
  name: string,
  deadLineDate: Date,
  lastUpdateDate: Date,
  finishDate: Date,
  planedSellPrice: number,
  capital: number,
  isArchived: boolean,
  profitInPercent: number,
  description: string,
}
