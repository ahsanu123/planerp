import { IChangeEvent } from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';
import { ExcludedType, NestedSchemaModel, UiSchemaTyped } from "./RJSFCustomTypes";
import { SubmitButton } from "./Templates/SubmitButton";
import { FieldTemplate } from "./Templates/FieldTemplate";
import { generateForm } from "./PrimerForm";
import { FormContextType, RJSFSchema, StrictRJSFSchema } from "@rjsf/utils";

export interface DefineRSJFFormProps<
  T extends ExcludedType,
  S extends StrictRJSFSchema,
  F extends FormContextType
> {
  schema: NestedSchemaModel<T>,
  uiSchema?: UiSchemaTyped<T>,
  onSubmit?: (data: IChangeEvent<T, S, F>) => void,
}

export function defineRSJFForm<
  T extends ExcludedType,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any>
  (
    props: DefineRSJFFormProps<T, S, F>
    /*TODO: Add Validator props*/
  ): JSX.Element {

  const {
    schema,
    uiSchema,
    onSubmit
  } = props;

  const Form = generateForm();

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      onSubmit={onSubmit}
    />
  );
}
