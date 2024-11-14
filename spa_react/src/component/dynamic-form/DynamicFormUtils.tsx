import Form from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';
import { ExcludedType, NestedSchemaModel, UiSchemaTyped } from "./RJSFCustomTypes";
import { defaultWidget } from "./MockDynamicForm";
import { TemplateSubmitButtonComponent } from "./TemplatesSubmitButton";
import { FieldTemplatesComponent } from "./FieldTemplates";

export function defineRSJFForm<T extends ExcludedType>(
  schema: NestedSchemaModel<T>,
  uiSchema?: UiSchemaTyped<T>
  /*TODO: Add Validator props*/
): JSX.Element {

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      widgets={defaultWidget}
      validator={validator}
      templates={{
        ButtonTemplates: {
          SubmitButton: TemplateSubmitButtonComponent
        },
        FieldTemplate: FieldTemplatesComponent
      }}
      onSubmit={(data) => console.log(data)}
    />
  );
}
