
import { WidgetProps } from "@rjsf/utils";
import { ChangeEvent, FocusEvent } from "react";
import { FormControl, Textarea } from "@primer/react";
import { isNullOrEmpty } from "../../shared/function";
import { BasicWidgetSchema } from "./RJSFCustomTypes";
import './TextInputWrapper.scss';

export const TextareaWidgetComponent = (props: WidgetProps<any, BasicWidgetSchema>) => {
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

  const _onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => onChange(value);
  const _onBlur = ({ target }: FocusEvent<HTMLTextAreaElement>) => onBlur(id, target && target.value);
  const _onFocus = ({ target }: FocusEvent<HTMLTextAreaElement>) => onFocus(id, target && target.value);

  const description: string | undefined = options.description ?? schema.description;

  return (
    <FormControl
      id={id}
    >
      <FormControl.Label>{label}</FormControl.Label>
      <Textarea
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
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
