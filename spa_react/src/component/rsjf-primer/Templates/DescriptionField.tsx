import { Text } from "@primer/react";
import {
  DescriptionFieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export const DescriptionField = <
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: DescriptionFieldProps<T, S, F>) => {
  const { id, description } = props;
  if (description) {
    return (
      <Text id={id} as="p" mt={1}>
        {description}
      </Text>
    );
  }

  return null;
};
