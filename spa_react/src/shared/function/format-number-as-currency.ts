export const CurrencyType = [
  'Id',
  'Us',
] as const;
export type CurrencyTypeCode = typeof CurrencyType[number];

interface LocalesTypeAndOption {
  locales: Intl.LocalesArgument,
  options: Intl.NumberFormatOptions,
}

export const localesTypes: Record<CurrencyTypeCode, LocalesTypeAndOption> = {
  Id: {
    locales: 'id-ID',
    options: { style: 'currency', currency: 'IDR' },
  },
  Us: {
    locales: 'en-US',
    options: { style: 'currency', currency: 'USD' },
  }
};

export const FormatNumberAsCurrency = (data: number, currencyType?: CurrencyTypeCode) => {
  const currencyOption = currencyType ? localesTypes[currencyType] : localesTypes.Id;
  return Intl.NumberFormat(currencyOption.locales, currencyOption.options).format(data);
};
