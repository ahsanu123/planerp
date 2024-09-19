import { Button, Details, PageLayout } from "@primer/react";
import { observer } from "mobx-react-lite";
import svgPanZoom from "svg-pan-zoom";
import { useMermaidDiagramService } from "../../shared/hooks/use-mermaid-diagram";
import { createElement, Suspense, useEffect, useRef, useState } from "react";
import React from 'react';

interface MermaidDiagramProps {
  data: string,
  title?: string,
}

type PromiseStatusType = 'pending' | 'fullfilled' | 'error';

const wrapPromise = <T,>(promise: Promise<T>) => {
  let status: PromiseStatusType = 'pending';
  let response: T;

  const suspender = promise.then(
    (res) => {
      status = 'fullfilled';
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    }
  );

  const read = () => {
    if (!suspender) {
      throw suspender;
    }
    return response;
    // switch (status) {
    //   case 'pending':
    //     throw suspender;
    //   case 'error':
    //     throw response;
    //   case 'fullfilled':
    //     return response;
  };
  return { read };
};

const MermaidCom = ({ diagram }: { diagram: HTMLElement }) => {
  const compRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    compRef.current?.appendChild(diagram);
    if (compRef.current) {
      svgPanZoom(diagram, {
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
      });
    }
  }, []);

  return (
    <div
      ref={compRef}
    />
  );
};

const DummyComponent = React.lazy(async () => {
  const {
    mermaidService,
  } = useMermaidDiagramService();

  const diagram = await mermaidService.renderMermaidDiagram();

  return Promise.resolve().then(() => {
    return {
      default: () => <MermaidCom diagram={diagram} />
    };
  });
});


const MermaidDiagramComponent: React.FC<MermaidDiagramProps> = (props) => {
  const {
    data,
    title,
  } = props;

  return (
    <PageLayout>
      <PageLayout.Header>
        <h2>{title ?? 'Mermaid Diagram'}</h2>
      </PageLayout.Header>

      <PageLayout.Content>

        <Suspense
          fallback={<p>loading</p>}
        >
          <DummyComponent />
        </Suspense>
      </PageLayout.Content>

    </PageLayout>
  );
};

export const MermaidDiagram = observer(MermaidDiagramComponent);
