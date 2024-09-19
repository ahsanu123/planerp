import mermaid from "mermaid";
import svgPanZoom from "svg-pan-zoom";

export interface MermaidService_RenderResult {
  diagramType: string
}

export class MermaidDiagramService {
  private domParser: DOMParser;
  constructor() {
    mermaid.initialize({
      startOnLoad: false,
      flowchart: {
        useMaxWidth: false,
      }
    });

    this.domParser = new DOMParser();
  }

  async renderMermaidDiagram(/*text?: string, moveable?: boolean*/) {
    const data = `
flowchart TB
    A --> C
    A --> D
    B --> C
    B --> D

`;
    const {
      svg,
      diagramType
    } = await mermaid.render('grapid', data);

    const parsedSvg = this.domParser.parseFromString(svg, 'image/svg+xml');
    parsedSvg.documentElement.setAttribute('width', '100%');
    parsedSvg.documentElement.setAttribute('height', 'auto');
    return parsedSvg.documentElement;
  }
}

const defaultMermaidDiagramService = new MermaidDiagramService();

export const useMermaidDiagramService = () => {

  return {
    mermaidService: defaultMermaidDiagramService
  };
};
