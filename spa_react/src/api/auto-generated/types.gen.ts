// This file is auto-generated by @hey-api/openapi-ts

export type BaseModel = {
  id?: (number);
};

export type Component = BaseModel & {
  name?: (string) | null;
  partNumber?: (string) | null;
  imageUrl?: (string) | null;
  apiUrl?: (string) | null;
  type?: (string) | null;
  category?: (string) | null;
  description?: (string) | null;
  price?: number;
  capital?: number;
  supplier?: (string) | null;
  supplierLink?: (string) | null;
  isAssembly?: boolean;
  stock?: number;
  buyDate?: Date;
  storageId?: (number) | null;
};

export type ComponentPriceHistory = {
  path?: (string) | null;
  url?: (string) | null;
  componentId?: number;
};

export type Currency = {
  time?: (string) | null;
  cube?: Array<CurrencyItem> | null;
};

export type CurrencyItem = {
  currency?: (string) | null;
  rate?: number;
};

export type LoggerModel = BaseModel & {
  date?: Date;
  title?: (string) | null;
  description?: (string) | null;
  projectId?: (number) | null;
};

export type ProducingStep = BaseModel & {
  listStep?: (string) | null;
  projectId?: (number) | null;
};

export type Project = BaseModel & {
  name?: (string) | null;
  imageUrl?: (string) | null;
  createdDate?: Date;
  deadLineDate?: (Date) | null;
  lastUpdatedDate?: Date;
  finishedDate?: (Date) | null;
  sellPrice?: (number) | null;
  capital?: number;
  fail?: boolean;
  finish?: boolean;
  profitInPersen?: (number) | null;
  description?: (string) | null;
};

export type RegisterIdentityModal = {
  userName?: (string) | null;
  email?: (string) | null;
  firstName?: (string) | null;
  lastName?: (string) | null;
  password?: (string) | null;
};

export type ResourceDoc = BaseModel & {
  overview?: (string) | null;
  description?: (string) | null;
};

export type Storage = BaseModel & {
  name?: (string) | null;
  location?: (string) | null;
  description?: (string) | null;
};

export type Unit = BaseModel & {
  name?: (string) | null;
  abbrevation?: (string) | null;
};

export type UsedComponent = BaseModel & {
  projectId?: number;
  componentId?: number;
  count?: number;
  totalPrice?: number;
};

export type Value = BaseModel & {
  nominal?: number;
};

export type ComponentAddNewData = {
  body: Component;
};

export type ComponentAddNewResponse = ((Blob | File));

export type ComponentAddNewError = unknown;

export type ComponentGetData = {
  path: {
    id: number;
  };
};

export type ComponentGetResponse = ((Blob | File));

export type ComponentGetError = unknown;

export type ComponentGetAllResponse = ((Blob | File));

export type ComponentGetAllError = unknown;

export type ComponentUpdateData = {
  body: Component;
};

export type ComponentUpdateResponse = ((Blob | File));

export type ComponentUpdateError = unknown;

export type ComponentDeleteData = {
  path: {
    id: number;
  };
};

export type ComponentDeleteResponse = ((Blob | File));

export type ComponentDeleteError = unknown;

export type CurrencyGetRawCurrencyResponse = (Currency);

export type CurrencyGetRawCurrencyError = unknown;

export type FileUploadFileData = {
  body?: {
    file?: ((Blob | File)) | null;
  };
};

export type FileUploadFileResponse = ((Blob | File));

export type FileUploadFileError = unknown;

export type FileGetFileData = {
  query?: {
    fileName?: (string) | null;
  };
};

export type FileGetFileResponse = ((Blob | File));

export type FileGetFileError = unknown;

export type IdentityRegisterData = {
  body: RegisterIdentityModal;
};

export type IdentityRegisterResponse = ((Blob | File));

export type IdentityRegisterError = unknown;

export type IdentityGetExternalLoginInfoResponse = ((Blob | File));

export type IdentityGetExternalLoginInfoError = unknown;

export type LoggerAddNewData = {
  body: LoggerModel;
};

export type LoggerAddNewResponse = ((Blob | File));

export type LoggerAddNewError = unknown;

export type LoggerGetData = {
  path: {
    id: number;
  };
};

export type LoggerGetResponse = ((Blob | File));

export type LoggerGetError = unknown;

export type LoggerGetAllResponse = ((Blob | File));

export type LoggerGetAllError = unknown;

export type LoggerUpdateData = {
  body: LoggerModel;
};

export type LoggerUpdateResponse = ((Blob | File));

export type LoggerUpdateError = unknown;

export type LoggerDeleteData = {
  path: {
    id: number;
  };
};

export type LoggerDeleteResponse = ((Blob | File));

export type LoggerDeleteError = unknown;

export type OpenIddictExchangeResponse = ((Blob | File));

export type OpenIddictExchangeError = unknown;

export type PriceHistoryUpsertPriceHistoryData = {
  body: ComponentPriceHistory;
};

export type PriceHistoryUpsertPriceHistoryResponse = ((Blob | File));

export type PriceHistoryUpsertPriceHistoryError = unknown;

export type PriceHistoryGetAllPriceHistoryResponse = ((Blob | File));

export type PriceHistoryGetAllPriceHistoryError = unknown;

export type PriceHistoryGetApiPriceData = {
  path: {
    componentId: number;
  };
};

export type PriceHistoryGetApiPriceResponse = ((Blob | File));

export type PriceHistoryGetApiPriceError = unknown;

export type ProductionStepAddNewData = {
  body: ProducingStep;
};

export type ProductionStepAddNewResponse = ((Blob | File));

export type ProductionStepAddNewError = unknown;

export type ProductionStepGetData = {
  path: {
    id: number;
  };
};

export type ProductionStepGetResponse = ((Blob | File));

export type ProductionStepGetError = unknown;

export type ProductionStepGetAllResponse = ((Blob | File));

export type ProductionStepGetAllError = unknown;

export type ProductionStepUpdateData = {
  body: ProducingStep;
};

export type ProductionStepUpdateResponse = ((Blob | File));

export type ProductionStepUpdateError = unknown;

export type ProductionStepDeleteData = {
  path: {
    id: number;
  };
};

export type ProductionStepDeleteResponse = ((Blob | File));

export type ProductionStepDeleteError = unknown;

export type ProjectAddNewData = {
  body: Project;
};

export type ProjectAddNewResponse = ((Blob | File));

export type ProjectAddNewError = unknown;

export type ProjectGetData = {
  path: {
    id: number;
  };
};

export type ProjectGetResponse = ((Blob | File));

export type ProjectGetError = unknown;

export type ProjectGetAllResponse = ((Blob | File));

export type ProjectGetAllError = unknown;

export type ProjectUpdateData = {
  body: Project;
};

export type ProjectUpdateResponse = ((Blob | File));

export type ProjectUpdateError = unknown;

export type ProjectDeleteData = {
  path: {
    id: number;
  };
};

export type ProjectDeleteResponse = ((Blob | File));

export type ProjectDeleteError = unknown;

export type ProjectPageGetProjectDetailsData = {
  path: {
    projectId: number;
  };
};

export type ProjectPageGetProjectDetailsResponse = ((Blob | File));

export type ProjectPageGetProjectDetailsError = unknown;

export type ProjectPageAddComponentToProjectData = {
  body: UsedComponent;
};

export type ProjectPageAddComponentToProjectResponse = ((Blob | File));

export type ProjectPageAddComponentToProjectError = unknown;

export type ProjectPageAddLoggerToProjectData = {
  query?: {
    loggerId?: number;
    projectId?: number;
  };
};

export type ProjectPageAddLoggerToProjectResponse = ((Blob | File));

export type ProjectPageAddLoggerToProjectError = unknown;

export type ResourceDocumentAddNewData = {
  body: ResourceDoc;
};

export type ResourceDocumentAddNewResponse = ((Blob | File));

export type ResourceDocumentAddNewError = unknown;

export type ResourceDocumentGetData = {
  path: {
    id: number;
  };
};

export type ResourceDocumentGetResponse = ((Blob | File));

export type ResourceDocumentGetError = unknown;

export type ResourceDocumentGetAllResponse = ((Blob | File));

export type ResourceDocumentGetAllError = unknown;

export type ResourceDocumentUpdateData = {
  body: ResourceDoc;
};

export type ResourceDocumentUpdateResponse = ((Blob | File));

export type ResourceDocumentUpdateError = unknown;

export type ResourceDocumentDeleteData = {
  path: {
    id: number;
  };
};

export type ResourceDocumentDeleteResponse = ((Blob | File));

export type ResourceDocumentDeleteError = unknown;

export type SeedSeedDatabaseResponse = ((Blob | File));

export type SeedSeedDatabaseError = unknown;

export type SqlKataGetQrCodeResponse = ((Blob | File));

export type SqlKataGetQrCodeError = unknown;

export type SqlKataGetListClassResponse = ((Blob | File));

export type SqlKataGetListClassError = unknown;

export type StorageAddNewData = {
  body: Storage;
};

export type StorageAddNewResponse = ((Blob | File));

export type StorageAddNewError = unknown;

export type StorageGetData = {
  path: {
    id: number;
  };
};

export type StorageGetResponse = ((Blob | File));

export type StorageGetError = unknown;

export type StorageGetAllResponse = ((Blob | File));

export type StorageGetAllError = unknown;

export type StorageUpdateData = {
  body: Storage;
};

export type StorageUpdateResponse = ((Blob | File));

export type StorageUpdateError = unknown;

export type StorageDeleteData = {
  path: {
    id: number;
  };
};

export type StorageDeleteResponse = ((Blob | File));

export type StorageDeleteError = unknown;

export type UnitAddNewData = {
  body: Unit;
};

export type UnitAddNewResponse = ((Blob | File));

export type UnitAddNewError = unknown;

export type UnitGetData = {
  path: {
    id: number;
  };
};

export type UnitGetResponse = ((Blob | File));

export type UnitGetError = unknown;

export type UnitGetAllResponse = ((Blob | File));

export type UnitGetAllError = unknown;

export type UnitUpdateData = {
  body: Unit;
};

export type UnitUpdateResponse = ((Blob | File));

export type UnitUpdateError = unknown;

export type UnitDeleteData = {
  path: {
    id: number;
  };
};

export type UnitDeleteResponse = ((Blob | File));

export type UnitDeleteError = unknown;

export type UtilGetJsonData = {
  query?: {
    url?: (string) | null;
  };
};

export type UtilGetJsonResponse = ((Blob | File));

export type UtilGetJsonError = unknown;

export type UtilGetJsonWithPathData = {
  query?: {
    url?: (string) | null;
  };
};

export type UtilGetJsonWithPathResponse = ((Blob | File));

export type UtilGetJsonWithPathError = unknown;

export type ValueAddNewData = {
  body: Value;
};

export type ValueAddNewResponse = ((Blob | File));

export type ValueAddNewError = unknown;

export type ValueGetData = {
  path: {
    id: number;
  };
};

export type ValueGetResponse = ((Blob | File));

export type ValueGetError = unknown;

export type ValueGetAllResponse = ((Blob | File));

export type ValueGetAllError = unknown;

export type ValueUpdateData = {
  body: Value;
};

export type ValueUpdateResponse = ((Blob | File));

export type ValueUpdateError = unknown;

export type ValueDeleteData = {
  path: {
    id: number;
  };
};

export type ValueDeleteResponse = ((Blob | File));

export type ValueDeleteError = unknown;
