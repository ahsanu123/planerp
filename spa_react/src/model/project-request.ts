import { Project } from "./generated/project";

export type ProjectRequest = Omit<Project, 'id'>;
