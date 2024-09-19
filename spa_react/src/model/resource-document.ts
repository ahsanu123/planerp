import { BaseModel } from "./base-model";

export const ResourceDocumentTypes = [
  'datasheet',
  'app-note',
  'reference-manual',
] as const;

export type ResourceDocumentType = typeof ResourceDocumentTypes[number];

export interface ResourceDocument extends BaseModel {
  title: string,
  type: ResourceDocumentType,
  overview: string,
  link: string,
}
