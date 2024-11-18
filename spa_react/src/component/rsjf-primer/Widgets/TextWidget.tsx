import { WidgetProps } from "@rjsf/utils";
import { ChangeEvent, FocusEvent } from "react";
import { FormControl, TextInput, Stack, Text } from "@primer/react";
import './TextInputWrapper.scss';
import { BasicWidgetSchema } from "../RJSFCustomTypes";
import { camelCaseToSpaced, isNullOrEmpty } from "../../../shared/function";

export const TextWidgetComponent = (props: WidgetProps<any, BasicWidgetSchema>) => {
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

  const _onChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => onChange(checked);
  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>) => onBlur(id, target && target.value);
  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>) => onFocus(id, target && target.value);

  const description: string | undefined = options.description ?? schema.description;

  return (
    <Stack>
      <FormControl
        id={id}
      >
        <FormControl.Label>{camelCaseToSpaced(label)}</FormControl.Label>
        <TextInput
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={_onFocus}
          defaultValue={schema.default}
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

    </Stack>
  );
};
