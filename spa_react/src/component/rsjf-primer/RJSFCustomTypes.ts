import { Field, RegistryFieldsType, RegistryWidgetsType, RJSFSchema, UiSchema, Widget } from "@rjsf/utils";
export type Modify<T, R> = Omit<T, keyof R> & R;
export type UiSchemaProperties =
  'ui:classNames'
  | 'ui:widget'
  | 'ui:style';

export type PickUiSchemaProperties = Partial<Record<UiSchemaProperties, any>>;
export type UiSchemaTyped<T = any> = Partial<Record<keyof T, PickUiSchemaProperties | { [key: string]: PickUiSchemaProperties }>> & UiSchema;

export interface RJSFSchemaProperties {
  type: any;
}

export type RJSFSchemaTyped<T = any> = Modify<RJSFSchema,
  {
    required?: Array<keyof T>;
    properties?: Record<keyof T, RJSFSchemaProperties | any>;
  }>;

export type DefaultFieldList =
  'ArrayField'
  | 'ArraySchemaField'
  | 'BooleanField'
  | 'DescriptionField'
  | 'OneOfField'
  | 'AnyOfField'
  | 'NullField'
  | 'NumberField'
  | 'ObjectField'
  | 'SchemaField'
  | 'StringField'
  | 'TitleField'
  ;
export type DefaultWidgetList =
  | 'AltDateTimeWidget'
  | 'AltDateWidget'
  | 'CheckboxesWidget'
  | 'CheckboxWidget'
  | 'ColorWidget'
  | 'DateTimeWidget'
  | 'DateWidget'
  | 'EmailWidget'
  | 'FileWidget'
  | 'HiddenWidget'
  | 'PasswordWidget'
  | 'RadioWidget'
  | 'RangeWidget'
  | 'SelectWidget'
  | 'TextareaWidget'
  | 'TextWidget'
  | 'TimeWidget'
  | 'UpDownWidget'
  | 'URLWidget'
  ;

export type RegistryFieldsTyped = RegistryFieldsType & Partial<Record<DefaultFieldList, Field>>;
export type RegistryWidgetsTyped = RegistryWidgetsType & Partial<Record<DefaultWidgetList, Widget>>;

export enum BasicWidgetSchemaType {
  String = 'string',
  Integer = 'integer',
  Textarea = 'textarea',
  Boolean = 'boolean',
  File = 'file',
  Date = 'date'
}

export interface BasicWidgetSchema {
  type: BasicWidgetSchemaType,
  title?: string,
  readonly?: boolean,
  default?: string | any,
  placeholder?: string,
  description?: string,
  format?: 'data-url' | 'date-time' | 'date' | undefined,
  onSelectedFile?: (file: File) => void,
}

export type ExcludedType = Exclude<object, Date | Array<any>>;
export type NestedKeyof<ObjectType extends ExcludedType> = {
  [key in keyof ObjectType]:
  ObjectType[key] extends Date ? any :
  ObjectType[key] extends Array<any> ? any[] :
  ObjectType[key] extends ExcludedType ? NestedKeyof<ObjectType[key]> : BasicWidgetSchema & { [key: string]: any }
};

export type NestedSchemaModel<T extends ExcludedType> = {
  type: string;
  properties: Partial<NestedKeyof<T>>;
};
export type NestedUISchema<T extends ExcludedType> = NestedKeyof<T> & { [key: string]: any };
