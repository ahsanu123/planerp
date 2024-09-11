export const FormControlFactoryTypes = [
  'chips',
  'text-area',
  'text',
  'number',
  'file',
  'select',
] as const;

export type FormControlFactoryType = typeof FormControlFactoryTypes[number];

export interface FormFactoryModel<T> {
  title: string;
  onSubmit: (data: T) => void;
  onCancel?: (data: T) => void;
  data: T;
}
