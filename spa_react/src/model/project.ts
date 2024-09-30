import { BaseModel } from "./base-model";

export interface Project extends BaseModel {
  bomId: number,
  logId: number,
  resourceDocumentId: number,
  procedureId: number,
  name: string,
  thumbnailUrl: string,
  deadLineDate: Date,
  lastUpdateDate: Date,
  finishDate: Date,
  planedSellPrice: number,
  capital: number,
  isArchived: boolean,
  profitInPercent: number,
  description: string,
}

export type ProjectRequest = Omit<Project,
  'id'
  | 'bomId'
  | 'logId'
>;

