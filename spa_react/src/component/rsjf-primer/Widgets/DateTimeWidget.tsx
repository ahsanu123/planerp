import {
  getTemplate,
  localToUTC,
  utcToLocal,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

/** The `DateTimeWidget` component uses the `BaseInputTemplate` changing the type to `datetime-local` and transforms
 * the value to/from utc using the appropriate utility functions.
 *
 * @param props - The `WidgetProps` for this component
 */
export const DateTimeWidget = <
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) => {
  const { options, registry } = props;
  const BaseInputTemplate = getTemplate<"BaseInputTemplate", T, S, F>(
    "BaseInputTemplate",
    registry,
    options
  );
  const value = utcToLocal(props.value);
  const onChange = (value: any) => {
    props.onChange(localToUTC(value));
  };

  return (
    <BaseInputTemplate
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
      value={value}
      onChange={onChange}
    />
  );
};
