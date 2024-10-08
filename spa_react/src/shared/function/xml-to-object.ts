// reference: https://medium.com/@nitinpatel_20236/converting-xml-to-json-using-recursion-7b1df91b42d8
// TODO: Add ResultInterface
export const xmlToObject = <T>(text: string, objectValidationFunction: JsonObjectValidatorFunction): ResultInterface<T> => {
  const parsedDocument = new DOMParser().parseFromString(text, 'application/xml');
  const parsedError = parsedDocument.documentElement.getElementsByTagName('parsererror');
  if (parsedError.length > 0) return { hasError: true };

  const parseXmlToObject = (elements: HTMLElement | Element) => {
    const children = Array.from(elements.children);
    if (children.length === 0) return elements.innerHTML;

    const jsonResult: any = {};
    children.forEach((child) => {
      const childIsArray = children.filter((childElement) => childElement.nodeName === child.nodeName).length > 1;

      if (childIsArray) {
        if (jsonResult[child.nodeName] === undefined) {
          jsonResult[child.nodeName] = [parseXmlToObject(child)];
        } else {
          (jsonResult[child.nodeName] as Array<any>).push(parseXmlToObject(child));
        }
      } else {
        jsonResult[child.nodeName] = parseXmlToObject(child);
      }
    });

    return jsonResult;
  };

  const parsed = parseXmlToObject(parsedDocument.documentElement);
  if (objectValidationFunction(parsed)) return { parsed, hasError: false };

  return { hasError: true };
};
