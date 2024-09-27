export const elipsisText = (text: string, maxLength?: number) => (
  text !== '' ? `${text.slice(0, maxLength ?? 22)}...` : ''
);
