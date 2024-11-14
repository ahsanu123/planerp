import { WidgetProps } from "@rjsf/utils";
import { ChangeEvent, FocusEvent } from "react";
import { Checkbox, FormControl, Stack, Tooltip } from "@primer/react";
import { camelCaseToSpaced, isNullOrEmpty } from "../../shared/function";

export const CheckboxWidgetComponent = (props: WidgetProps) => {
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
    options,
    uiSchema
  } = props;

  const _onChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => onChange(checked);
  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>) => onBlur(id, target && target.value);
  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>) => onFocus(id, target && target.value);

  const description: string | undefined = options.description ?? schema.description;

  const checkboxComponent = (
    <FormControl
      id={id}
    >
      <Checkbox
        name={id}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        checked={typeof value === 'undefined' ? false : Boolean(value)}
        value={value}
      />
      {!isNullOrEmpty(label) && (
        <FormControl.Label>{camelCaseToSpaced(label)}</FormControl.Label>
      )}
    </FormControl>
  );

  return (
    <Stack>
      {isNullOrEmpty(description ?? '')
        ? <>{checkboxComponent}</>
        : (
          <Tooltip
            text={description}
          >
            {checkboxComponent}
          </Tooltip>
        )
      }
    </Stack>
  );
};
