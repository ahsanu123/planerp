import { Button, Dialog, Stack } from "@primer/react";
import { observer } from "mobx-react-lite";
import { Divider } from "@primer/react/lib-esm/ActionList/Divider";
import './CustomDialog.scss';

interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  sortDescription?: string;
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
    <Dialog
      onDissmis={onDismiss}
      isOpen={isOpen}
      className='custom-dialog-container'
    >
      <Dialog.Header>
        <h3>{title}</h3>
      </Dialog.Header>

      <Stack
        className='custom-dialog-content'
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
        className='custom-dialog-footer'
        style={{
          padding: '20px',
        }}
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
  );
};


export const CustomDialog = observer(CustomDialogComponent);
