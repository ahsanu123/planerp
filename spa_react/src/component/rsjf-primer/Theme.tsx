import { FormContextType, GenericObjectType, RegistryWidgetsType, RJSFSchema, StrictRJSFSchema } from "@rjsf/utils";
import { ThemeProps } from "@rjsf/core";
import { generateTemplates } from "./Templates";
import { RadioWidget } from "./Widgets/RadioWidget";
import { RangeWidget } from "./Widgets/RangeWidget";
import { SelectWidget } from "./Widgets/SelectWidget";
import { TextareaWidget } from "./Widgets/TextareaWidget";
import { CheckboxesWidget } from "./Widgets/CheckboxesWidget";
import { CheckboxWidget } from "./Widgets/CheckboxWidget";
import { DateTimeWidget } from "./Widgets/DateTimeWidget";
import { DateWidget } from "./Widgets/DateWidget";
import { FileWidget } from "./FileInputWidget";
export const generateTheme = <
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): ThemeProps<T, S, F> => {
  return {
    templates: generateTemplates<T, S, F>(),
    widgets: generateWidgets<T, S, F>(),
  };
};

const generateWidgets =
  <T, U, V extends GenericObjectType>(): RegistryWidgetsType<T, U, V> => {
    return {
      // CheckboxesWidget,
      CheckboxWidget,
      DateTimeWidget,
      DateWidget,
      FileWidget,
      RadioWidget,
      RangeWidget,
      SelectWidget,
      TextareaWidget,
      // EmailWidget,
      // AltDateTimeWidget,
      // AltDateWidget,
      // ColorWidget,
      // HiddenWidget,
      // PasswordWidget,
      // TextWidget,
      // TimeWidget,
      // UpDownWidget,
      // URLWidget,
    };
  };
