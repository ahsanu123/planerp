import { Button, Details, FormControl, PageLayout, Popover, Stack, Text, Textarea } from "@primer/react";
import { observer } from "mobx-react-lite";
import svgPanZoom from "svg-pan-zoom";
import { useMermaidDiagramService } from "../../shared/hooks/use-mermaid-diagram";
import { Suspense, useEffect, useRef, useState } from "react";
import React from 'react';
import { CodeIcon, InfoIcon } from "@primer/octicons-react";
import './mermaid-diagram.scss';
import { isNullOrEmpty } from "../../shared/function";

interface MermaidDiagramProps {
  dataText: string,
  title?: string,
  description?: string,
}

export interface SvgPanZoomCoordinate {
  zoom: number;
  panPoint: SvgPanZoom.Point;
}

const MermaidDiagramComponent: React.FC<MermaidDiagramProps> = (props) => {
  const {
    dataText,
    title,
    description,
  } = props;
  const {
    mermaidService,
  } = useMermaidDiagramService();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [isShowCode, setIsShowCode] = useState<boolean>(true);
  const [isShowErrorOverlay, setIsShowErrorOverlay] = useState<boolean>(false);
  const [dataString, setDataString] = useState<string>(dataText);
  const [svgPanZoomCoordinate, setSvgPanZoomCoordinate] = useState<SvgPanZoomCoordinate | undefined>(undefined);

  const compRef = useRef<HTMLDivElement>(null);

  const handleOnPan = (panPoint: SvgPanZoom.Point) => setSvgPanZoomCoordinate({
    zoom: svgPanZoomCoordinate?.zoom ?? 0,
    panPoint: panPoint,
  });

  const handleOnZoom = (scale: number) => setSvgPanZoomCoordinate({
    zoom: scale,
    panPoint: svgPanZoomCoordinate?.panPoint ?? { x: 0, y: 0 },
  });


  const renderMermaidDiagram = async () => {
    if (isNullOrEmpty(dataString)) return;
    let diagram: HTMLElement | undefined;

    try {
      setErrorText('');
      diagram = await mermaidService.renderMermaidDiagram(dataString);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorText(errorMessage);
    }

    if (compRef.current && diagram) {
      compRef.current.innerHTML = '';
      compRef.current.appendChild(diagram);
      const panZoom = svgPanZoom(diagram, {
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
        onZoom: handleOnZoom,
        onPan: handleOnPan,
      });

      if (svgPanZoomCoordinate) {
        panZoom.pan({ x: 0, y: 0 });
        panZoom.zoom(svgPanZoomCoordinate.zoom);
        panZoom.pan(svgPanZoomCoordinate.panPoint);
      }
    }
  };

  const handleMermaidCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataString(event.target.value);
  };

  const renderErrorMessages = (): JSX.Element => (
    <>
      {
        !isNullOrEmpty(errorText)
        && (
          <FormControl.Validation
            variant='error'
          >
            <span
              onMouseEnter={() => setIsShowErrorOverlay(true)}
              onMouseLeave={() => setIsShowErrorOverlay(false)}
            >
              error &nbsp;
              <InfoIcon size={16} />
            </span>
            <Popover
              open={isShowErrorOverlay}
            >
              <Popover.Content>
                <Text
                  className='error-overlay-text'
                  as='span'
                >
                  {errorText}
                </Text>
              </Popover.Content>
            </Popover>
          </FormControl.Validation>
        )
      }
    </>
  );

  useEffect(() => {
    setLoading(true);
    renderMermaidDiagram();
    setLoading(false);
  }, [dataString]);

  return (
    <Stack
      className='mermaid-diagram-container'
    >
      <PageLayout>
        <PageLayout.Header>
          <h2>{title ?? 'Mermaid Diagram'}</h2>
          <p>
            {description}
          </p>
          <Button
            onClick={() => setIsShowCode(!isShowCode)}
          >
            <CodeIcon
              size={16}
            />
            &nbsp; Show Code
          </Button>
        </PageLayout.Header>

        <PageLayout.Content>
          {loading && <p>loading</p>}
          {
            !loading
            && (
              <Stack
                direction='horizontal'
              >
                {
                  isShowCode
                  && (
                    <FormControl>
                      <FormControl.Label>
                        Code
                      </FormControl.Label>
                      <Textarea
                        className='mermaid-diagram-textarea'
                        value={dataString}
                        resize='none'
                        onChange={handleMermaidCodeChange}
                      />
                      {renderErrorMessages()}
                    </FormControl>
                  )
                }

                <div
                  className='mermaid-pan-able'
                  ref={compRef}
                />
              </Stack>
            )
          }
        </PageLayout.Content>

      </PageLayout>
    </Stack>
  );
};

export const MermaidDiagram = observer(MermaidDiagramComponent);
