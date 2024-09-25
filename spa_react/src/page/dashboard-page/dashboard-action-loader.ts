import { fetchApiwrapper, FetchApiWrapperOption } from "../../shared/function";

export class DashboardActionLoader {
  constructor() { }

  async getProjectList() {
    // await fetchApiwrapper<string>('', {} as FetchApiWrapperOption);
    return { some: 'hello' };
  }
}
