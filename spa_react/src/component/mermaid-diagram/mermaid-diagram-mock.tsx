import { observer } from "mobx-react-lite";
import { MermaidDiagram } from "./mermaid-diagram";

const description = `
This page contains a collection of examples of diagrams and charts that can be created through mermaid and its myriad applications.
If you wish to learn how to support mermaid on your webpage, read the Beginner's Guide.
If you wish to learn about mermaid's syntax, Read the Diagram Syntax section.
`;

export const mermaidMockData = `
erDiagram 

ProjectInSale {
 int id 
 int projectId
 string marketplace
 float listedPrice 
 float minimumPrice 
 float capitalPrice 
 int readyStock
 int buildableStock 
}

Project {
 int id 
 int bomId
 int resourceDocumentId
 int procedureId
 int logId
 string name 
 date deadlineDate 
 date lastUpdateDate
 date finishDate 
 float planedSellPrice 
 float capital 
 boolean archive 
 float profitInPercent
 string description
}

ResourceDocument {
 int id
 string title 
 string type 
 string overview 
 string link 
 string source 
}

Component {
 int id 
 int ResourceDocument
 int StorageId
 string name 
 string overview 
 float stock 
 float price 
 string type 
 string suplier 
 string suplierLink
 boolean isAssembly 
}

Procedure {
 int id
 string title
 string overview
 string description 
 string[] steps 
}

Log {
 int id 
 string title 
 string[] listLog
}

ProjectInSale ||--|{ Project: have
Project |o--o{ ResourceDocument : have
Project |o--|{ Procedure: have
Project |o--o{ Log: have
Component |o--o{ ResourceDocument : have
`;
const MermaidDiagramMockComponent: React.FC = () => (
  <MermaidDiagram
    title='Flowchart With Mermaid Diagram'
    dataText={mermaidMockData}
    description={description}
  />
);

export const MermaidDiagramMock = observer(MermaidDiagramMockComponent);
