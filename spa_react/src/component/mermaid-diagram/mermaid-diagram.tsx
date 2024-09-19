import { Details, PageLayout } from "@primer/react";
import { observer } from "mobx-react-lite";
import svgPanZoom from "svg-pan-zoom";
import { useMermaidDiagramService } from "../../shared/hooks/use-mermaid-diagram";
import { Suspense, useEffect, useRef, useState } from "react";
import React from 'react';
import './mermaid-diagram.scss';
import { mermaidMockData } from "./mermaid-diagram-mock";

interface MermaidDiagramProps {
  data: string,
  title?: string,
  description?: string,
}

const MermaidDiagramComponent: React.FC<MermaidDiagramProps> = (props) => {
  const {
    data,
    title,
    description,
  } = props;
  const {
    mermaidService,
  } = useMermaidDiagramService();

  const [loading, setLoading] = useState<boolean>(false);
  const compRef = useRef<HTMLDivElement>(null);

  const renderMermaidDiagram = async () => {
    setLoading(true);
    const diagram = await mermaidService.renderMermaidDiagram(data);

    if (compRef.current && diagram) {
      compRef.current.appendChild(diagram);
      svgPanZoom(diagram, {
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    renderMermaidDiagram();
  });

  return (
    <PageLayout>
      <PageLayout.Header>
        <h2>{title ?? 'Mermaid Diagram'}</h2>
        <p>
          {description}
        </p>
      </PageLayout.Header>

      <PageLayout.Content>

        {
          loading
            ? <p>loading</p>
            : (
              <div
                className='mermaid-pan-able'
                ref={compRef}
              />
            )
        }

      </PageLayout.Content>

    </PageLayout>
  );
};

export const MermaidDiagram = observer(MermaidDiagramComponent);
