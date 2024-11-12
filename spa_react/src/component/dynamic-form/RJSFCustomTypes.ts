import { Field, RegistryFieldsType, RegistryWidgetsType, RJSFSchema, UiSchema, Widget } from "@rjsf/utils";
export type Modify<T, R> = Omit<T, keyof R> & R;
export type UiSchemaProperties =
  'ui:classNames'
  | 'ui:style';

export type PickUiSchemaProperties = Partial<Record<UiSchemaProperties, any>>;
export type UiSchemaTyped<T = any> = Partial<Record<keyof T, PickUiSchemaProperties | any>> & UiSchema;

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
