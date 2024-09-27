import { Button, Dialog, Stack } from "@primer/react";
import { observer } from "mobx-react-lite";
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
      isOpen={isOpen}
      className='custom-dialog-container'
      onDissmis={() => onDismiss()}
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
        <Stack>
          {
            content && content
          }
        </Stack>

      </Stack>
    </Dialog>
  );
};


export const CustomDialog = observer(CustomDialogComponent);
