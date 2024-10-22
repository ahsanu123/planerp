import { FileDirectoryIcon } from "@primer/octicons-react";
import { Button, Tooltip } from "@primer/react";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { elipsisText } from "../../shared/function";

interface ButtonInputFileProps {
  onFileSelected: (file: File) => void;
  label?: string;
  hideLabel?: boolean;
  allowedFileTypes?: string[];
}

const ButtonInputFileComponent: React.FC<ButtonInputFileProps> = (props) => {
  const {
    onFileSelected,
    label = 'choose file',
    allowedFileTypes,
    hideLabel = false,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const handleSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      onFileSelected(file);
    }
  };

  return (
    <>
      <Button
        onClick={() => fileInputRef.current?.click()}
      >
        <FileDirectoryIcon size={16} />
        &nbsp;{!hideLabel && (label)}
      </Button>
      <input
        onChange={(event) => handleSelectedFile(event)}
        ref={fileInputRef}
        type='file'
        accept={allowedFileTypes?.join(',') ?? '*'}
        hidden
      />
    </>
  );
};

export const ButtonInputFile = observer(ButtonInputFileComponent);
