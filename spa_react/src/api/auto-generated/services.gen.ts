// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options, formDataBodySerializer } from '@hey-api/client-fetch';
import type { ComponentAddNewData, ComponentAddNewError, ComponentAddNewResponse, ComponentGetData, ComponentGetError, ComponentGetResponse, ComponentGetAllError, ComponentGetAllResponse, ComponentUpdateData, ComponentUpdateError, ComponentUpdateResponse, ComponentDeleteData, ComponentDeleteError, ComponentDeleteResponse, CurrencyGetRawCurrencyError, CurrencyGetRawCurrencyResponse, FileUploadFileData, FileUploadFileError, FileUploadFileResponse, FileGetFileData, FileGetFileError, FileGetFileResponse, IdentityRegisterData, IdentityRegisterError, IdentityRegisterResponse, IdentityGetExternalLoginInfoError, IdentityGetExternalLoginInfoResponse, LoggerAddNewData, LoggerAddNewError, LoggerAddNewResponse, LoggerGetData, LoggerGetError, LoggerGetResponse, LoggerGetAllError, LoggerGetAllResponse, LoggerUpdateData, LoggerUpdateError, LoggerUpdateResponse, LoggerDeleteData, LoggerDeleteError, LoggerDeleteResponse, OpenIddictExchangeError, OpenIddictExchangeResponse, PriceHistoryUpsertPriceHistoryData, PriceHistoryUpsertPriceHistoryError, PriceHistoryUpsertPriceHistoryResponse, PriceHistoryGetAllPriceHistoryError, PriceHistoryGetAllPriceHistoryResponse, PriceHistoryGetApiPriceData, PriceHistoryGetApiPriceError, PriceHistoryGetApiPriceResponse, ProductionStepAddNewData, ProductionStepAddNewError, ProductionStepAddNewResponse, ProductionStepGetData, ProductionStepGetError, ProductionStepGetResponse, ProductionStepGetAllError, ProductionStepGetAllResponse, ProductionStepUpdateData, ProductionStepUpdateError, ProductionStepUpdateResponse, ProductionStepDeleteData, ProductionStepDeleteError, ProductionStepDeleteResponse, ProjectAddNewData, ProjectAddNewError, ProjectAddNewResponse, ProjectGetData, ProjectGetError, ProjectGetResponse, ProjectGetAllError, ProjectGetAllResponse, ProjectUpdateData, ProjectUpdateError, ProjectUpdateResponse, ProjectDeleteData, ProjectDeleteError, ProjectDeleteResponse, ProjectPageGetProjectDetailsData, ProjectPageGetProjectDetailsError, ProjectPageGetProjectDetailsResponse, ProjectPageAddComponentToProjectData, ProjectPageAddComponentToProjectError, ProjectPageAddComponentToProjectResponse, ProjectPageAddLoggerToProjectData, ProjectPageAddLoggerToProjectError, ProjectPageAddLoggerToProjectResponse, ResourceDocumentAddNewData, ResourceDocumentAddNewError, ResourceDocumentAddNewResponse, ResourceDocumentGetData, ResourceDocumentGetError, ResourceDocumentGetResponse, ResourceDocumentGetAllError, ResourceDocumentGetAllResponse, ResourceDocumentUpdateData, ResourceDocumentUpdateError, ResourceDocumentUpdateResponse, ResourceDocumentDeleteData, ResourceDocumentDeleteError, ResourceDocumentDeleteResponse, SeedSeedDatabaseError, SeedSeedDatabaseResponse, SqlKataGetQrCodeError, SqlKataGetQrCodeResponse, SqlKataGetListClassError, SqlKataGetListClassResponse, StorageAddNewData, StorageAddNewError, StorageAddNewResponse, StorageGetData, StorageGetError, StorageGetResponse, StorageGetAllError, StorageGetAllResponse, StorageUpdateData, StorageUpdateError, StorageUpdateResponse, StorageDeleteData, StorageDeleteError, StorageDeleteResponse, UnitAddNewData, UnitAddNewError, UnitAddNewResponse, UnitGetData, UnitGetError, UnitGetResponse, UnitGetAllError, UnitGetAllResponse, UnitUpdateData, UnitUpdateError, UnitUpdateResponse, UnitDeleteData, UnitDeleteError, UnitDeleteResponse, UtilGetJsonData, UtilGetJsonError, UtilGetJsonResponse, UtilGetJsonWithPathData, UtilGetJsonWithPathError, UtilGetJsonWithPathResponse, ValueAddNewData, ValueAddNewError, ValueAddNewResponse, ValueGetData, ValueGetError, ValueGetResponse, ValueGetAllError, ValueGetAllResponse, ValueUpdateData, ValueUpdateError, ValueUpdateResponse, ValueDeleteData, ValueDeleteError, ValueDeleteResponse } from './types.gen';

export const client = createClient(createConfig());

export class ComponentService {
  public static componentAddNew<ThrowOnError extends boolean = false>(options: Options<ComponentAddNewData, ThrowOnError>) {
    return (options?.client ?? client).post<ComponentAddNewResponse, ComponentAddNewError, ThrowOnError>({
      ...options,
      url: '/Component/create'
    });
  }

  public static componentGet<ThrowOnError extends boolean = false>(options: Options<ComponentGetData, ThrowOnError>) {
    return (options?.client ?? client).get<ComponentGetResponse, ComponentGetError, ThrowOnError>({
      ...options,
      url: '/Component/get/{id}'
    });
  }

  public static componentGetAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<ComponentGetAllResponse, ComponentGetAllError, ThrowOnError>({
      ...options,
      url: '/Component/all'
    });
  }

  public static componentUpdate<ThrowOnError extends boolean = false>(options: Options<ComponentUpdateData, ThrowOnError>) {
    return (options?.client ?? client).put<ComponentUpdateResponse, ComponentUpdateError, ThrowOnError>({
      ...options,
      url: '/Component/update'
    });
  }

  public static componentDelete<ThrowOnError extends boolean = false>(options: Options<ComponentDeleteData, ThrowOnError>) {
    return (options?.client ?? client).delete<ComponentDeleteResponse, ComponentDeleteError, ThrowOnError>({
      ...options,
      url: '/Component/delete/{id}'
    });
  }

}

export class CurrencyService {
  /**
   * Get Currency from ecb.europa.eu in euro
   */
  public static currencyGetRawCurrency<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<CurrencyGetRawCurrencyResponse, CurrencyGetRawCurrencyError, ThrowOnError>({
      ...options,
      url: '/Currency/GetRawCurrency'
    });
  }

}

export class FileService {
  /**
   * Upload File To SFTP
   */
  public static fileUploadFile<ThrowOnError extends boolean = false>(options?: Options<FileUploadFileData, ThrowOnError>) {
    return (options?.client ?? client).post<FileUploadFileResponse, FileUploadFileError, ThrowOnError>({
      ...options,
      ...formDataBodySerializer,
      headers: {
        'Content-Type': null,
        ...options?.headers
      },
      url: '/File/file'
    });
  }

  /**
   * Download file  By File Name
   */
  public static fileGetFile<ThrowOnError extends boolean = false>(options?: Options<FileGetFileData, ThrowOnError>) {
    return (options?.client ?? client).get<FileGetFileResponse, FileGetFileError, ThrowOnError>({
      ...options,
      url: '/File/file'
    });
  }

}

export class IdentityService {
  public static identityRegister<ThrowOnError extends boolean = false>(options: Options<IdentityRegisterData, ThrowOnError>) {
    return (options?.client ?? client).post<IdentityRegisterResponse, IdentityRegisterError, ThrowOnError>({
      ...options,
      url: '/register'
    });
  }

  public static identityGetExternalLoginInfo<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<IdentityGetExternalLoginInfoResponse, IdentityGetExternalLoginInfoError, ThrowOnError>({
      ...options,
      url: '/external-login-info'
    });
  }

}

export class LoggerService {
  public static loggerAddNew<ThrowOnError extends boolean = false>(options: Options<LoggerAddNewData, ThrowOnError>) {
    return (options?.client ?? client).post<LoggerAddNewResponse, LoggerAddNewError, ThrowOnError>({
      ...options,
      url: '/Logger/create'
    });
  }

  public static loggerGet<ThrowOnError extends boolean = false>(options: Options<LoggerGetData, ThrowOnError>) {
    return (options?.client ?? client).get<LoggerGetResponse, LoggerGetError, ThrowOnError>({
      ...options,
      url: '/Logger/get/{id}'
    });
  }

  public static loggerGetAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<LoggerGetAllResponse, LoggerGetAllError, ThrowOnError>({
      ...options,
      url: '/Logger/all'
    });
  }

  public static loggerUpdate<ThrowOnError extends boolean = false>(options: Options<LoggerUpdateData, ThrowOnError>) {
    return (options?.client ?? client).put<LoggerUpdateResponse, LoggerUpdateError, ThrowOnError>({
      ...options,
      url: '/Logger/update'
    });
  }

  public static loggerDelete<ThrowOnError extends boolean = false>(options: Options<LoggerDeleteData, ThrowOnError>) {
    return (options?.client ?? client).delete<LoggerDeleteResponse, LoggerDeleteError, ThrowOnError>({
      ...options,
      url: '/Logger/delete/{id}'
    });
  }

}

export class OpenIddictService {
  public static openIddictExchange<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).post<OpenIddictExchangeResponse, OpenIddictExchangeError, ThrowOnError>({
      ...options,
      url: '/connect/token'
    });
  }

}

export class PriceHistoryService {
  public static priceHistoryUpsertPriceHistory<ThrowOnError extends boolean = false>(options: Options<PriceHistoryUpsertPriceHistoryData, ThrowOnError>) {
    return (options?.client ?? client).post<PriceHistoryUpsertPriceHistoryResponse, PriceHistoryUpsertPriceHistoryError, ThrowOnError>({
      ...options,
      url: '/PriceHistory/Add'
    });
  }

  public static priceHistoryGetAllPriceHistory<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<PriceHistoryGetAllPriceHistoryResponse, PriceHistoryGetAllPriceHistoryError, ThrowOnError>({
      ...options,
      url: '/PriceHistory/GetAll'
    });
  }

  public static priceHistoryGetApiPrice<ThrowOnError extends boolean = false>(options: Options<PriceHistoryGetApiPriceData, ThrowOnError>) {
    return (options?.client ?? client).get<PriceHistoryGetApiPriceResponse, PriceHistoryGetApiPriceError, ThrowOnError>({
      ...options,
      url: '/PriceHistory/GetById/{componentId}'
    });
  }

}

export class ProductionStepService {
  public static productionStepAddNew<ThrowOnError extends boolean = false>(options: Options<ProductionStepAddNewData, ThrowOnError>) {
    return (options?.client ?? client).post<ProductionStepAddNewResponse, ProductionStepAddNewError, ThrowOnError>({
      ...options,
      url: '/ProductionStep/create'
    });
  }

  public static productionStepGet<ThrowOnError extends boolean = false>(options: Options<ProductionStepGetData, ThrowOnError>) {
    return (options?.client ?? client).get<ProductionStepGetResponse, ProductionStepGetError, ThrowOnError>({
      ...options,
      url: '/ProductionStep/get/{id}'
    });
  }

  public static productionStepGetAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<ProductionStepGetAllResponse, ProductionStepGetAllError, ThrowOnError>({
      ...options,
      url: '/ProductionStep/all'
    });
  }

  public static productionStepUpdate<ThrowOnError extends boolean = false>(options: Options<ProductionStepUpdateData, ThrowOnError>) {
    return (options?.client ?? client).put<ProductionStepUpdateResponse, ProductionStepUpdateError, ThrowOnError>({
      ...options,
      url: '/ProductionStep/update'
    });
  }

  public static productionStepDelete<ThrowOnError extends boolean = false>(options: Options<ProductionStepDeleteData, ThrowOnError>) {
    return (options?.client ?? client).delete<ProductionStepDeleteResponse, ProductionStepDeleteError, ThrowOnError>({
      ...options,
      url: '/ProductionStep/delete/{id}'
    });
  }

}

export class ProjectService {
  public static projectAddNew<ThrowOnError extends boolean = false>(options: Options<ProjectAddNewData, ThrowOnError>) {
    return (options?.client ?? client).post<ProjectAddNewResponse, ProjectAddNewError, ThrowOnError>({
      ...options,
      url: '/Project/create'
    });
  }

  public static projectGet<ThrowOnError extends boolean = false>(options: Options<ProjectGetData, ThrowOnError>) {
    return (options?.client ?? client).get<ProjectGetResponse, ProjectGetError, ThrowOnError>({
      ...options,
      url: '/Project/get/{id}'
    });
  }

  public static projectGetAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<ProjectGetAllResponse, ProjectGetAllError, ThrowOnError>({
      ...options,
      url: '/Project/all'
    });
  }

  public static projectUpdate<ThrowOnError extends boolean = false>(options: Options<ProjectUpdateData, ThrowOnError>) {
    return (options?.client ?? client).put<ProjectUpdateResponse, ProjectUpdateError, ThrowOnError>({
      ...options,
      url: '/Project/update'
    });
  }

  public static projectDelete<ThrowOnError extends boolean = false>(options: Options<ProjectDeleteData, ThrowOnError>) {
    return (options?.client ?? client).delete<ProjectDeleteResponse, ProjectDeleteError, ThrowOnError>({
      ...options,
      url: '/Project/delete/{id}'
    });
  }

}

export class ProjectPageService {
  public static projectPageGetProjectDetails<ThrowOnError extends boolean = false>(options: Options<ProjectPageGetProjectDetailsData, ThrowOnError>) {
    return (options?.client ?? client).get<ProjectPageGetProjectDetailsResponse, ProjectPageGetProjectDetailsError, ThrowOnError>({
      ...options,
      url: '/ProjectPage/details/{projectId}'
    });
  }

  public static projectPageAddComponentToProject<ThrowOnError extends boolean = false>(options: Options<ProjectPageAddComponentToProjectData, ThrowOnError>) {
    return (options?.client ?? client).post<ProjectPageAddComponentToProjectResponse, ProjectPageAddComponentToProjectError, ThrowOnError>({
      ...options,
      url: '/ProjectPage/add-component'
    });
  }

  public static projectPageAddLoggerToProject<ThrowOnError extends boolean = false>(options?: Options<ProjectPageAddLoggerToProjectData, ThrowOnError>) {
    return (options?.client ?? client).post<ProjectPageAddLoggerToProjectResponse, ProjectPageAddLoggerToProjectError, ThrowOnError>({
      ...options,
      url: '/ProjectPage/add-Logger'
    });
  }

}

export class ResourceDocumentService {
  public static resourceDocumentAddNew<ThrowOnError extends boolean = false>(options: Options<ResourceDocumentAddNewData, ThrowOnError>) {
    return (options?.client ?? client).post<ResourceDocumentAddNewResponse, ResourceDocumentAddNewError, ThrowOnError>({
      ...options,
      url: '/ResourceDocument/create'
    });
  }

  public static resourceDocumentGet<ThrowOnError extends boolean = false>(options: Options<ResourceDocumentGetData, ThrowOnError>) {
    return (options?.client ?? client).get<ResourceDocumentGetResponse, ResourceDocumentGetError, ThrowOnError>({
      ...options,
      url: '/ResourceDocument/get/{id}'
    });
  }

  public static resourceDocumentGetAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<ResourceDocumentGetAllResponse, ResourceDocumentGetAllError, ThrowOnError>({
      ...options,
      url: '/ResourceDocument/all'
    });
  }

  public static resourceDocumentUpdate<ThrowOnError extends boolean = false>(options: Options<ResourceDocumentUpdateData, ThrowOnError>) {
    return (options?.client ?? client).put<ResourceDocumentUpdateResponse, ResourceDocumentUpdateError, ThrowOnError>({
      ...options,
      url: '/ResourceDocument/update'
    });
  }

  public static resourceDocumentDelete<ThrowOnError extends boolean = false>(options: Options<ResourceDocumentDeleteData, ThrowOnError>) {
    return (options?.client ?? client).delete<ResourceDocumentDeleteResponse, ResourceDocumentDeleteError, ThrowOnError>({
      ...options,
      url: '/ResourceDocument/delete/{id}'
    });
  }

}

export class SeedService {
  public static seedSeedDatabase<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<SeedSeedDatabaseResponse, SeedSeedDatabaseError, ThrowOnError>({
      ...options,
      url: '/Seed'
    });
  }

}

export class SqlKataService {
  public static sqlKataGetQrCode<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<SqlKataGetQrCodeResponse, SqlKataGetQrCodeError, ThrowOnError>({
      ...options,
      url: '/SqlKata/QRCode'
    });
  }

  public static sqlKataGetListClass<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<SqlKataGetListClassResponse, SqlKataGetListClassError, ThrowOnError>({
      ...options,
      url: '/SqlKata/ListClass'
    });
  }

}

export class StorageService {
  public static storageAddNew<ThrowOnError extends boolean = false>(options: Options<StorageAddNewData, ThrowOnError>) {
    return (options?.client ?? client).post<StorageAddNewResponse, StorageAddNewError, ThrowOnError>({
      ...options,
      url: '/Storage/create'
    });
  }

  public static storageGet<ThrowOnError extends boolean = false>(options: Options<StorageGetData, ThrowOnError>) {
    return (options?.client ?? client).get<StorageGetResponse, StorageGetError, ThrowOnError>({
      ...options,
      url: '/Storage/get/{id}'
    });
  }

  public static storageGetAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<StorageGetAllResponse, StorageGetAllError, ThrowOnError>({
      ...options,
      url: '/Storage/all'
    });
  }

  public static storageUpdate<ThrowOnError extends boolean = false>(options: Options<StorageUpdateData, ThrowOnError>) {
    return (options?.client ?? client).put<StorageUpdateResponse, StorageUpdateError, ThrowOnError>({
      ...options,
      url: '/Storage/update'
    });
  }

  public static storageDelete<ThrowOnError extends boolean = false>(options: Options<StorageDeleteData, ThrowOnError>) {
    return (options?.client ?? client).delete<StorageDeleteResponse, StorageDeleteError, ThrowOnError>({
      ...options,
      url: '/Storage/delete/{id}'
    });
  }

}

export class UnitService {
  public static unitAddNew<ThrowOnError extends boolean = false>(options: Options<UnitAddNewData, ThrowOnError>) {
    return (options?.client ?? client).post<UnitAddNewResponse, UnitAddNewError, ThrowOnError>({
      ...options,
      url: '/Unit/create'
    });
  }

  public static unitGet<ThrowOnError extends boolean = false>(options: Options<UnitGetData, ThrowOnError>) {
    return (options?.client ?? client).get<UnitGetResponse, UnitGetError, ThrowOnError>({
      ...options,
      url: '/Unit/get/{id}'
    });
  }

  public static unitGetAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<UnitGetAllResponse, UnitGetAllError, ThrowOnError>({
      ...options,
      url: '/Unit/all'
    });
  }

  public static unitUpdate<ThrowOnError extends boolean = false>(options: Options<UnitUpdateData, ThrowOnError>) {
    return (options?.client ?? client).put<UnitUpdateResponse, UnitUpdateError, ThrowOnError>({
      ...options,
      url: '/Unit/update'
    });
  }

  public static unitDelete<ThrowOnError extends boolean = false>(options: Options<UnitDeleteData, ThrowOnError>) {
    return (options?.client ?? client).delete<UnitDeleteResponse, UnitDeleteError, ThrowOnError>({
      ...options,
      url: '/Unit/delete/{id}'
    });
  }

}

export class UtilService {
  public static utilGetJson<ThrowOnError extends boolean = false>(options?: Options<UtilGetJsonData, ThrowOnError>) {
    return (options?.client ?? client).get<UtilGetJsonResponse, UtilGetJsonError, ThrowOnError>({
      ...options,
      url: '/Util'
    });
  }

  public static utilGetJsonWithPath<ThrowOnError extends boolean = false>(options?: Options<UtilGetJsonWithPathData, ThrowOnError>) {
    return (options?.client ?? client).get<UtilGetJsonWithPathResponse, UtilGetJsonWithPathError, ThrowOnError>({
      ...options,
      url: '/Util/path'
    });
  }

}

export class ValueService {
  public static valueAddNew<ThrowOnError extends boolean = false>(options: Options<ValueAddNewData, ThrowOnError>) {
    return (options?.client ?? client).post<ValueAddNewResponse, ValueAddNewError, ThrowOnError>({
      ...options,
      url: '/Value/create'
    });
  }

  public static valueGet<ThrowOnError extends boolean = false>(options: Options<ValueGetData, ThrowOnError>) {
    return (options?.client ?? client).get<ValueGetResponse, ValueGetError, ThrowOnError>({
      ...options,
      url: '/Value/get/{id}'
    });
  }

  public static valueGetAll<ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) {
    return (options?.client ?? client).get<ValueGetAllResponse, ValueGetAllError, ThrowOnError>({
      ...options,
      url: '/Value/all'
    });
  }

  public static valueUpdate<ThrowOnError extends boolean = false>(options: Options<ValueUpdateData, ThrowOnError>) {
    return (options?.client ?? client).put<ValueUpdateResponse, ValueUpdateError, ThrowOnError>({
      ...options,
      url: '/Value/update'
    });
  }

  public static valueDelete<ThrowOnError extends boolean = false>(options: Options<ValueDeleteData, ThrowOnError>) {
    return (options?.client ?? client).delete<ValueDeleteResponse, ValueDeleteError, ThrowOnError>({
      ...options,
      url: '/Value/delete/{id}'
    });
  }

}
