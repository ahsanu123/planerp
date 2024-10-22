import { Stack, Text } from "@primer/react";
import { observer } from "mobx-react-lite";
import React from "react";
import './ImageViewer.scss';

interface ImageViewerProps {
  imageUrl: string;
  caption?: string;
  className?: string;
  children?: React.ReactNode;
}

const ImageViewerComponent: React.FC<ImageViewerProps> = (props) => {
  const {
    imageUrl,
    className,
    children,
    caption,
  } = props;
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
