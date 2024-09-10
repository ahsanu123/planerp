import { makeAutoObservable } from "mobx";

export class ReportPageStore {
  constructor() {
    makeAutoObservable(this);
  }
}
