import mermaid, { MermaidConfig } from "mermaid";

export interface MermaidService_RenderResult {
  diagramType: string
}
export const defaultMermaidDiagramConfig: MermaidConfig = {
  flowchart: { useMaxWidth: false },
  sequence: { useMaxWidth: false },
  gantt: { useMaxWidth: false },
  journey: { useMaxWidth: false },
  timeline: { useMaxWidth: false },
  class: { useMaxWidth: false },
  state: { useMaxWidth: false },
  er: { useMaxWidth: false },
  pie: { useMaxWidth: false },
  quadrantChart: { useMaxWidth: false },
  xyChart: { useMaxWidth: false },
  requirement: { useMaxWidth: false },
  architecture: { useMaxWidth: false },
  mindmap: { useMaxWidth: false },
  gitGraph: { useMaxWidth: false },
  c4: { useMaxWidth: false },
  sankey: { useMaxWidth: false },
  packet: { useMaxWidth: false },
  block: { useMaxWidth: false },
};

export class MermaidDiagramService {
  private domParser: DOMParser;
  constructor() {
    mermaid.initialize({
      startOnLoad: false,
      ...defaultMermaidDiagramConfig,
    });


    this.domParser = new DOMParser();
  }

  async renderMermaidDiagram(data: string) {
    const {
      svg,
      diagramType
    } = await mermaid.render(`mermaid-${Date.now()}`, data);

    const parsedSvg = this.domParser.parseFromString(svg, 'image/svg+xml');
    parsedSvg.documentElement.setAttribute('width', '100%');
    parsedSvg.documentElement.setAttribute('height', '100%');
    return parsedSvg.documentElement;
  }
}

const defaultMermaidDiagramService = new MermaidDiagramService();

export const useMermaidDiagramService = () => {

  return {
    mermaidService: defaultMermaidDiagramService
  };
};
