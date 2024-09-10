import { makeAutoObservable } from "mobx";

export class ProjectPageStore {
  constructor() {
    makeAutoObservable(this);
  }
}
