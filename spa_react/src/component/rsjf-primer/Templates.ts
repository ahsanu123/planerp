import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TemplatesType,
} from "@rjsf/utils";
import { AddButton } from "./Templates/AddButton";
import { ArrayFieldItemTemplate } from "./Templates/ArrayFieldItemTemplate";
import { ArrayFieldTemplate } from "./Templates/ArrayFieldTemplate";
import { BaseInputTemplate } from "./Templates/BaseInputTemplate";
import { DescriptionField } from "./Templates/DescriptionField";
import { ErrorList } from "./Templates/ErrorList";
import { FieldErrorTemplate } from "./Templates/FieldErrorTemplate";
import { FieldHelpTemplate } from "./Templates/FieldHelpTemplate";
import { FieldTemplate } from "./Templates/FieldTemplate";
import { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } from "./Templates/IconButton";
import { ObjectFieldTemplate } from "./Templates/ObjectFieldTemplate";
import { SubmitButton } from "./Templates/SubmitButton";
import { TitleField } from "./Templates/TitleField";
import { WrapIfAdditionalTemplate } from "./Templates/WrapIfAdditionalTemplate";

export const generateTemplates = <
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): Partial<TemplatesType<T, S, F>> => {
  return {
    ArrayFieldItemTemplate,
    ArrayFieldTemplate,
    BaseInputTemplate,
    ButtonTemplates: {
      AddButton,
      CopyButton,
      MoveDownButton,
      MoveUpButton,
      RemoveButton,
      SubmitButton,
    },
    DescriptionFieldTemplate: DescriptionField,
    ErrorListTemplate: ErrorList,
    FieldErrorTemplate,
    FieldHelpTemplate,
    FieldTemplate,
    ObjectFieldTemplate,
    TitleFieldTemplate: TitleField,
    WrapIfAdditionalTemplate,
  };
};

