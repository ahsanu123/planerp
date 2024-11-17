import {
  FormContextType,
  RegistryWidgetsType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";
import { TextareaWidget } from "./Widgets/TextareaWidget";
import { RangeWidget } from "./Widgets/RangeWidget";
import { CheckboxesWidget } from "./Widgets/CheckboxesWidget";
import { CheckboxWidget } from "./Widgets/CheckboxWidget";
import { DateTimeWidget } from "./Widgets/DateTimeWidget";
import { DateWidget } from "./Widgets/DateWidget";
import { RadioWidget } from "./Widgets/RadioWidget";
import { SelectWidget } from "./Widgets/SelectWidget";


const generateWidgets = <
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): RegistryWidgetsType<T, S, F> => {
  return {
    CheckboxWidget,
    CheckboxesWidget,
    DateWidget,
    DateTimeWidget,
    RadioWidget,
    RangeWidget,
    SelectWidget,
    TextareaWidget,
  };
};

export default generateWidgets();
