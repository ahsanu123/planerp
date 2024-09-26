// from: https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-title-case-text
export const camelCaseToSpaced = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
