import { PencilIcon } from "@primer/octicons-react";
import { Stack, Tooltip } from "@primer/react";
import { observer } from "mobx-react-lite";
import './DoubleClickEditor.scss';

interface DoubleClickEditorProps {
  value?: string
  content?: JSX.Element,
  onDoubleClicked: (status: boolean) => void;
}
const DoubleClickEditorComponent: React.FC<DoubleClickEditorProps> = (props) => {
  const {
    value,
    content,
    onDoubleClicked,
  } = props;
  return (
    <Stack
      className='double-click-editor-container'
      onDoubleClick={() => onDoubleClicked(true)}
      horizontal
    >

      <Tooltip
        text='double click to edit'
        direction='e'
      >
        <span>
          {value} &nbsp;
        </span>
        <PencilIcon
          className='edit-icon'
          size={16}
        />

      </Tooltip>
    </Stack>
  );
};

export const DoubleClickEditor = observer(DoubleClickEditorComponent);
