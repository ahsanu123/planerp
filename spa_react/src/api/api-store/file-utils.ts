import { API_BASE_URL } from "../../shared/constant";
import { fetchApiwrapper } from "../../shared/function";

export class FileUtils {
  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const ret = await fetchApiwrapper<{ fileName: string }>(`${API_BASE_URL}/File/file`, formData, {
      method: 'POST',
    });

    return ret.fileName;
  }

  constructor() { }
}
