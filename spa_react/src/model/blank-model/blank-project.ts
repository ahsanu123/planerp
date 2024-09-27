import { Project, ProjectRequest } from "../project";


export const blankProject: Project = {
  bomId: 0,
  resourceDocumentId: 0,
  procedureId: 0,
  logId: 0,
  name: "",
  deadLineDate: new Date(),
  lastUpdateDate: new Date(),
  finishDate: new Date(),
  planedSellPrice: 0,
  capital: 0,
  isArchived: false,
  profitInPercent: 0,
  description: "",
  id: 0
};

export const blankProjectRequest: ProjectRequest = {
  resourceDocumentId: 0,
  procedureId: 0,
  name: "",
  deadLineDate: new Date(),
  lastUpdateDate: new Date(),
  finishDate: new Date(),
  planedSellPrice: 0,
  capital: 0,
  isArchived: false,
  profitInPercent: 0,
  description: "",
};
