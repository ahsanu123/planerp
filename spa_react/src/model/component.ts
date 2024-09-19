import { BaseModel } from "./base-model";

export const BasicComponentTypes = [
  'pasive',
  'active',
] as const;

export type BasicComponentType = typeof BasicComponentTypes[number];

export interface Component extends BaseModel {
  resourceDocumentId: number,
  storageId: number,
  name: string,
  overview: string,
  stock: number,
  price: number,
  type: BasicComponentType,
  suplierName: string,
  suplierLink: string,
  isAssemly: boolean,
}
