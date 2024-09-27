import { FileDirectoryIcon } from "@primer/octicons-react";
import { Button } from "@primer/react";
import { observer } from "mobx-react-lite";
import { useRef } from "react";

interface ButtonInputFileProps {
  label?: string;
  hideLabel?: boolean;
  allowedFileTypes?: string[];
}

const ButtonInputFileComponent: React.FC<ButtonInputFileProps> = (props) => {
  const {
    label = 'choose file',
    allowedFileTypes,
    hideLabel = false,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        onClick={() => fileInputRef.current?.click()}
      >
        <FileDirectoryIcon size={16} />
        &nbsp;{!hideLabel && (label)}
      </Button>
      <input
        ref={fileInputRef}
        type='file'
        accept={allowedFileTypes?.join(',') ?? '*'}
        hidden
      />
    </>
  );
};

export const ButtonInputFile = observer(ButtonInputFileComponent);
