import { Reducer } from "react";
import { RegistryFieldsTyped } from "./RJSFCustomTypes";
import { ReactFCWithFieldProps } from "./MockDynamicForm";

export function defineCustomRJSFField<Model, Action>(component: ReactFCWithFieldProps<Model>, reducerFn: Reducer<Model, Action>): RegistryFieldsTyped {
  return {
  };
}
