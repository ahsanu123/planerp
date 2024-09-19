import { BaseModel } from "./base-model";

export interface Procedure extends BaseModel {
  title: string,
  overview: string,
  description: string,
  steps: string[];
}
