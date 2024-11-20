import { action, makeAutoObservable, observable } from "mobx";

export class ProjectHistoryPageStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable
  title: string = "hello world";

  @action
  setTitle() {
    this.title = "huh";
  }
}
