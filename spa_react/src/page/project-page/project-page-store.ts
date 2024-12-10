import { action, makeAutoObservable, observable } from "mobx";
import { Project } from "../../model/generated/project";

/*
 * Project Page Store State Pseudocode 
 *
 * ProjectPageStore{
 *
 * latestUpdatedProject -> contain 5 last updated project 
 * @setLastUpdatedProject -> function to set latestUpdatedProject
 *
 * ProjectList -> contain all project, get it on load Page
 * @setProjectList -> function to set project list
 *
 * }
 *
 * */

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
