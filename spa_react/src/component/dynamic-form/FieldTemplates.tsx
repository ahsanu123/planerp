import { FieldTemplateProps, SubmitButtonProps } from "@rjsf/utils";
import { Button, Stack } from "@primer/react";
export const FieldTemplatesComponent = (props: FieldTemplateProps) => {
  const {
    id,
    classNames,
    style,
    label,
    help,
    required,
    description,
    errors,
    children
  } = props;

  return (
    <Stack>
      {description}
      {children}
      {errors}
      {help}
    </Stack>
  );
};
