import { Button, Dialog, Stack } from "@primer/react";
import { Divider } from "@primer/react/lib-esm/deprecated/ActionList/Divider";
import { observer } from "mobx-react-lite";
import './CustomDialog.scss';

interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  sortDescription: string;
  content?: JSX.Element;
  onDismiss: () => void;
  onConfirm: () => void;
}

const CustomDialogComponent: React.FC<CustomDialogProps> = (props) => {

  const {
    title,
    sortDescription,
    content,
    isOpen,
    onDismiss,
    onConfirm
  } = props;

  return (

    <>
      <Dialog
        onDissmis={onDismiss}
        isOpen={isOpen}
        className="custom-dialog_container"
      >
        <Dialog.Header>
          <h3>{title}</h3>
        </Dialog.Header>

        <Stack
          className='custom-dialog_content'
        >
          <span>
            {sortDescription}
          </span>

          <Divider />
        </Stack>

        {
          content && content
        }

        <Stack
          direction='horizontal'
          justify='end'
          className='custom-dialog_footer'
        >
          <Button
            onClick={onDismiss}
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Stack>

      </Dialog>
    </>

  );
};


export const CustomDialog = observer(CustomDialogComponent);
