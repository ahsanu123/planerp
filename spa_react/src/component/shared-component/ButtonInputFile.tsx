import { FillColorsSchema } from "@blocksuite/blocks/dist/index.js";
import { FileDirectoryIcon } from "@primer/octicons-react";
import { Button, Heading, Popover, Tooltip } from "@primer/react";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { elipsisText } from "../../shared/function";

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
  const [file, setFile] = useState<File>();
  const handleSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      console.log(file);
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
      <Tooltip
        text={file?.name}
        direction='s'
      >
        {elipsisText(file?.name ?? '')}
      </Tooltip>
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
