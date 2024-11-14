import Form from '@rjsf/core';
import { observer } from "mobx-react-lite";
import { ArrayFieldTemplateProps, FieldProps, ObjectFieldTemplateProps, RegistryWidgetsType, TemplatesType, WidgetProps } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { BasicWidgetSchema, BasicWidgetSchemaType, NestedSchemaModel, RegistryFieldsTyped, RJSFSchemaTyped, UiSchemaTyped } from './RJSFCustomTypes';
import { ChangeEvent, Reducer } from 'react';
import { Checkbox, FormControl, TextInput } from '@primer/react';
import { CheckboxWidgetComponent } from './CheckboxWidget';

import { TextWidgetComponent } from './TextWidget';
import { TextareaWidgetComponent } from './TextareaWidget';
import { FileInputWidgetComponent } from './FileInputWidget';
import { DateTimeWidgetComponent } from './DateTimeWidget';
import { TemplateSubmitButtonComponent } from './TemplatesSubmitButton';

interface Model {
  AltDateTimeWidget: string;
  AltDateWidget: string;
  CheckboxesWidget: string;
  CheckboxWidget: string;
  ColorWidget: string;
  DateTimeWidget: string;
  DateWidget: string;
  EmailWidget: string;
  FileWidget: string;
  HiddenWidget: string;
  PasswordWidget: string;
  RadioWidget: string;
  RangeWidget: string;
  SelectWidget: string;
  TextareaWidget: string;
  TextWidget: string;
  TimeWidget: string;
  UpDownWidget: string;
  URLWidget: string;
}


const schemaModel: NestedSchemaModel<Model> = {
  type: 'object',
  properties: {
    AltDateTimeWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    AltDateWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    CheckboxesWidget: {
      title: 'Basic22',
      description: 'hello',
      type: BasicWidgetSchemaType.Boolean
    },
    CheckboxWidget: {
      title: 'Basic',
      type: BasicWidgetSchemaType.Boolean
    },
    ColorWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    DateTimeWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    DateWidget: {
      type: BasicWidgetSchemaType.String,
      format: 'date'
    },
    EmailWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    FileWidget: {
      type: BasicWidgetSchemaType.String,
      format: 'data-url',
      onSelectedFile: () => undefined
    },
    HiddenWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    PasswordWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    RadioWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    RangeWidget: {
      type: BasicWidgetSchemaType.String,
      placeholder: 'TODO',
    },
    SelectWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    TextareaWidget: {
      type: BasicWidgetSchemaType.String
    },
    TextWidget: {
      type: BasicWidgetSchemaType.String,
      description: 'this is description',
    },
    TimeWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    UpDownWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    },
    URLWidget: {
      placeholder: 'TODO',
      type: BasicWidgetSchemaType.String
    }
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



const BasicInputWidgetComponent = (props: WidgetProps<HTMLInputElement, BasicWidgetSchema>) => {
  let type: React.HTMLInputTypeAttribute;
  switch (props.schema.type) {
    case BasicWidgetSchemaType.String:
      type = 'text';
      break;

    case BasicWidgetSchemaType.Number:
      type = 'number';
      break;

    case BasicWidgetSchemaType.Boolean:
      type = 'checkbox';
      break;

    default:
      type = 'text';
      break;
  }
  return (
    <>
      <FormControl.Label>{props.title}</FormControl.Label>
      <TextInput
        type={type}
        id={props.id}
        onChange={(event) => props.onChange(event.target.value)}
        onFocus={(ev) => props.onFocus(ev.currentTarget.id, ev.currentTarget.value)}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        required={props.required}
        onBlur={(ev) => props.onBlur(ev.currentTarget.id, ev.currentTarget.value)}
        placeholder={props.placeholder}
        value={props.value}
      />
    </>
  );
};
export const defaultWidget: RegistryWidgetsType = {
  TextWidget: TextWidgetComponent,
  AltDateTimeWidget: BasicInputWidgetComponent,
  AltDateWidget: BasicInputWidgetComponent,
  CheckboxesWidget: CheckboxWidgetComponent,
  CheckboxWidget: CheckboxWidgetComponent,
  ColorWidget: BasicInputWidgetComponent,
  DateTimeWidget: BasicInputWidgetComponent,
  DateWidget: DateTimeWidgetComponent,
  EmailWidget: BasicInputWidgetComponent,
  FileWidget: FileInputWidgetComponent,
  HiddenWidget: BasicInputWidgetComponent,
  PasswordWidget: BasicInputWidgetComponent,
  RadioWidget: BasicInputWidgetComponent,
  RangeWidget: BasicInputWidgetComponent,
  SelectWidget: BasicInputWidgetComponent,
  TextareaWidget: TextareaWidgetComponent,
  TimeWidget: BasicInputWidgetComponent,
  UpDownWidget: BasicInputWidgetComponent,
  URLWidget: BasicInputWidgetComponent,
};

const DynamicFormComponent: React.FC = () => {
  const schema: RJSFSchemaTyped = {
    ...schemaModel
  };

  const uiSchema: UiSchemaTyped<Model> = {
    TextareaWidget: {
      'ui:widget': 'textarea'
    }
  };
  return (
    <Form
      schema={schema}
      validator={validator}
      uiSchema={uiSchema}
      widgets={defaultWidget}
      templates={{
        ButtonTemplates: {
          SubmitButton: TemplateSubmitButtonComponent
        }
      }}
      onSubmit={(data) => console.log(data)}
    />
  );
};

export const DynamicForm = observer(DynamicFormComponent);
