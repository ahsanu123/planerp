const digitOnlyRegex = /^\d+$/;
export const isOnlyDigitNumber = (data: any) => digitOnlyRegex.test(data);
