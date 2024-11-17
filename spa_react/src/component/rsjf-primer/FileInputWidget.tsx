import { WidgetProps } from "@rjsf/utils";
import { FormControl, Textarea } from "@primer/react";
import { isNullOrEmpty } from "../../shared/function";
import { ButtonInputFile } from "../shared-component";
import { BasicWidgetSchema } from "./RJSFCustomTypes";
export const FileWidget = (props: WidgetProps<any, any>) => {
  const {
    schema,
    id,
    value,
    disabled,
    readonly,
    label = '',
    hideLabel,
    autofocus,

    onChange,
    onBlur,
    onFocus,
    registry,
    required,
    options,
    uiSchema
  } = props;


  const description: string | undefined = options.description ?? schema.description;
  const _onSelectedFile = schema.onSelectedFile ?? (() => undefined);

  return (
    <FormControl
      id={id}
    >
      <FormControl.Label>{label}</FormControl.Label>
      <ButtonInputFile
        onFileSelected={_onSelectedFile}
      />
      {!isNullOrEmpty(description ?? '') && (
        <FormControl.Caption>
          {description}
        </FormControl.Caption>
      )}
    </FormControl>
  );
};
