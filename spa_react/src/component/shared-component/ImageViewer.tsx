import { Button, Stack, Text } from "@primer/react";
import { observer } from "mobx-react-lite";
import React from "react";
import './ImageViewer.scss';
import { ButtonInputFile } from "./ButtonInputFile";
import { useApiStore } from "../../api/api-store/useApiStore";

interface ImageViewerProps {
  imageUrl: string;
  onImageUrlChanged?: (uploadedFileName: string) => void;
  caption?: string;
  className?: string;
  children?: React.ReactNode;
  showChangeButton?: boolean;
}

const ImageViewerComponent: React.FC<ImageViewerProps> = (props) => {
  const {
    imageUrl,
    className,
    children,
    caption,
    onImageUrlChanged,
    showChangeButton = false,
  } = props;

  const {
    fileUtils
  } = useApiStore();

  const handleUploadImage = async (file: File) => {
    const fileName = await fileUtils.uploadFile(file);
    if (onImageUrlChanged) onImageUrlChanged(fileName);
  };

  return (
    <Stack
      className={`image-viewer-container ${className}`}
    >
      <img
        style={{
          width: '100%',
          height: 'auto',
        }}
        src={imageUrl}
      />

      {(showChangeButton) && (
        <ButtonInputFile
          onFileSelected={(file) => handleUploadImage(file)}
          label='Change Image'
        />
      )}

      <Text
        className='image-viewer-caption'
      >
        {caption}
      </Text>
      {children}
    </Stack>
  );
};

export const ImageViewer = observer(ImageViewerComponent);
