import { WidgetProps } from "@rjsf/utils";
import { ChangeEvent, FocusEvent } from "react";
import { Checkbox, FormControl, TextInput, Tooltip, Text } from "@primer/react";
import { camelCaseToSpaced, isNullOrEmpty } from "../../shared/function";
import { BasicWidgetSchema } from "./RJSFCustomTypes";
export const DateTimeWidgetComponent = (props: WidgetProps<any, BasicWidgetSchema>) => {
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

  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => onChange(value);
  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>) => onBlur(id, target && target.value);
  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>) => onFocus(id, target && target.value);

  const description: string | undefined = options.description ?? schema.description;

  return (
    <FormControl
      id={id}
    >
      <FormControl.Label>{camelCaseToSpaced(label)}</FormControl.Label>
      <TextInput
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        type='date'
        defaultValue={schema.defaultValue}
        disabled={disabled}
        required={required}
        placeholder={schema.placeholder}
        value={value}
      />
      {!isNullOrEmpty(description ?? '') && (
        <FormControl.Caption>
          {description}
        </FormControl.Caption>
      )}
    </FormControl>
  );
};
