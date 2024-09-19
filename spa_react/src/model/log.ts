import { BaseModel } from "./base-model";

export interface Log extends BaseModel {
  title: string,
  list: string[],
}
