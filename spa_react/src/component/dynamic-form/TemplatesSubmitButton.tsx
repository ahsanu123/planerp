import { SubmitButtonProps } from "@rjsf/utils";
import { Button } from "@primer/react";
export const TemplateSubmitButtonComponent = (props: SubmitButtonProps) => {
  const {
    registry,
    uiSchema
  } = props;


  return (
    <Button
      type='submit'
    >
      Submit
    </Button>
  );
};
