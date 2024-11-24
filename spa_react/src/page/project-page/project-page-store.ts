import { action, makeAutoObservable, observable } from "mobx";
import { Project } from "../../model/generated/project";

export class ProjectPageStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable
  ProjectList: Array<Project> = [];

  @action
  setProjectList(projectList: Project[]) {
    this.ProjectList = projectList;
  }
}
