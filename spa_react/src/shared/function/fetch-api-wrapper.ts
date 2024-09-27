export type ApiMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface FetchApiWrapperOption {
  method: ApiMethodType,
  apiToken?: string,
  header?: HeadersInit,
}
export type ApiValidationFunction = (object: any) => boolean;

export const fetchApiwrapper = async <T>(url: string, option: FetchApiWrapperOption, validator?: ApiValidationFunction): Promise<T> => {
  let parsedData: T | undefined;

  const response = await fetch(url, {
    method: option.method,
    headers: option.header,
  });

  const responseData = await response.text();
  try {
    // TODO: combine json parse with validator function
    if (validator) console.log('TODO: Add validator function');

    parsedData = JSON.parse(responseData);
  } catch (error) {
    console.error(error as Error);
  }

  if (!parsedData) throw new Error('parsed data is undefined');

  return new Promise((resolve) => resolve(parsedData));
};
