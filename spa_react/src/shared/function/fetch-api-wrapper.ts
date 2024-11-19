export type ApiMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface FetchApiWrapperOption {
  mode: RequestMode,
  method: ApiMethodType,
  apiToken?: string,
  header?: HeadersInit,
}
export type ApiValidationFunction = (object: any) => boolean;

export const fetchApiwrapper = async <T>(
  url: string,
  body: BodyInit | null | undefined,
  option: FetchApiWrapperOption,
  validator?: ApiValidationFunction
): Promise<T> => {
  let parsedData: T | undefined;

  const response = await fetch(url, {
    mode: option.mode,
    method: option.method,
    headers: option.header,
    body: body,
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

