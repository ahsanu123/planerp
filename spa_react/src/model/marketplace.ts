export const MarketPlaceTypes = [
  'shopee',
  'tokopedia',
  'bukalapak'
] as const;

export type MarketPlaceType = typeof MarketPlaceTypes[number];

