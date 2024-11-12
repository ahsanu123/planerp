import Form from '@rjsf/core';
import { observer } from "mobx-react-lite";
import { ArrayFieldTemplateProps, FieldProps, ObjectFieldTemplateProps, RegistryWidgetsType, WidgetProps } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { RegistryFieldsTyped, RJSFSchemaTyped, UiSchemaTyped } from './RJSFCustomTypes';
import { Reducer } from 'react';
import { FormControl, TextInput } from '@primer/react';

interface Log {
  date: Date;
  title: string;
}
interface Model {
  name: string;
  createdDate: Date;
  finish: boolean;
  logs: Log[];
}

type ExcludedType = Exclude<object, Date | Array<any>>;
type NestedKeyof<ObjectType extends ExcludedType> = {
  [key in keyof ObjectType]:
  ObjectType[key] extends Date ? any :
  ObjectType[key] extends Array<any> ? any[] :
  ObjectType[key] extends ExcludedType ? NestedKeyof<ObjectType[key]> : any
};

type NestedSchemaModel<T extends ExcludedType> = {
  type: string;
  properties: NestedKeyof<T>;
};
type NestedUISchema<T extends ExcludedType> = NestedKeyof<T> & { [key: string]: any };

const schemaModel: NestedSchemaModel<Model> = {
  type: 'object',
  properties: {
    name: {
      type: "string",
      title: "name",
    },
    logs: [],
    createdDate: {
      "type": "string",
      "format": "date"
    },
    finish: {
      type: 'boolean'
    },
  }
};

type SomeAction = 'add' | 'delete';
type AppAction = {
  type: SomeAction;
  value: any;
};

export type ReactFCWithFieldProps<Model = any> = React.FC<FieldProps<Model, any, any>>;

function defineCustomRJSFField<Model, Action>(component: ReactFCWithFieldProps<Model>, reducerFn: Reducer<Model, Action>): RegistryFieldsTyped {
  return {
  };
}
function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  return (
    <div>
      {props.items.map((element) => element.children)}
      {props.canAdd && <button type='button' onClick={props.onAddClick}>add</button>}
    </div>
  );
}
function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  return (
    <div>
      {props.title}
      {props.description}
      {props.properties.map((element) => (
        <div className='property-wrapper'>{element.content}</div>
      ))}
    </div>
  );
}

// const reducerFunction: Reducer<Model, AppAction> = (state: Model, action: AppAction) => {
// };
//
// const CustomField: React.FC<FieldProps<Model, any, any>> = (props) => {
//
//   const [state, dispatch] = useReducer(reducerFunction, props.formData ?? {} as Model);
//
//   return (<>
//     <div>
//       lat
//       <input type='number' value={state.lat} onChange={() => dispatch({ type: 'add', value: state.lat })} />
//       lon
//       <input type='number' value={state.lon} onChange={() => dispatch({ type: 'add', value: state.lon })} />
//     </div>
//   </>);
//
// };


const DynamicFormComponent: React.FC = () => {
  const schema: RJSFSchemaTyped = {
    ...schemaModel
  };
  const customWidget = (props: WidgetProps) => (
    <>
      <FormControl.Label>{props.title}</FormControl.Label>
      <TextInput
        onChange={(event) => props.onChange(event.target.value)}
        defaultValue={props.defaultValue}
        value={props.value}
      />
    </>
  );

  const uiSchema: UiSchemaTyped<Model> = {
    name: {
      'ui:widget': 'jangkrik'
    }
  };

  // const fields: RegistryFieldsType = {
  //   geo: CustomField
  // };

  const widget: RegistryWidgetsType = {
    jangkrik: customWidget
  };

  return (
    <Form
      schema={schema}
      validator={validator}
      uiSchema={uiSchema}
      widgets={widget}
      onSubmit={(data) => console.log(data)}
    />
  );
};

export const DynamicForm = observer(DynamicFormComponent);
