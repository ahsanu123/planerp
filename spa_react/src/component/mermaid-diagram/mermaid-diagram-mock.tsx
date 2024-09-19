import { observer } from "mobx-react-lite";
import { MermaidDiagram } from "./mermaid-diagram";
const MermaidDiagramMockComponent: React.FC = () => (
  <MermaidDiagram
    data={""}
  />
);

export const MermaidDiagramMock = observer(MermaidDiagramMockComponent);
