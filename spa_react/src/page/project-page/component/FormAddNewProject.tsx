import { observer } from "mobx-react-lite";
import './FormAddNewProject.scss';
import { Button, Checkbox, FormControl, Stack, Textarea, TextInput } from "@primer/react";
import { ButtonInputFile } from "../../../component/shared-component/ButtonInputFile";
import { Field, Form, useFormik } from 'formik';
import { blankProject, blankProjectRequest } from "../../../model/blank-model";
import { useApiStore } from "../../../api/api-store/useApiStore";
import { Project } from "../../../model/generated/project";
import { ProjectRequest } from "../../../model/project-request";
import { defineRSJFForm } from "../../../component/dynamic-form/DynamicFormUtils";
import { BasicWidgetSchemaType } from "../../../component/dynamic-form/RJSFCustomTypes";

interface FormAddNewProjectProps {
  data: Project
  onSubmit: (value: ProjectRequest) => void;
  onCancel: () => void;
}

const mockProjectRequest: ProjectRequest = {
  name: "Automatic Coagulant Machine",
  deadLineDate: new Date(),
  lastUpdatedDate: new Date(),
  finishedDate: new Date(),
  capital: 500000,
  description: "Automatic Coagulant Machine With PID control System",
  imageUrl: "",
  createdDate: new Date(),
  sellPrice: 0,
  fail: false,
  finish: false,
  profitInPersen: 0
};

const FormAddNewProjectComponent: React.FC<FormAddNewProjectProps> = (props) => {
  const {
    data,
    onSubmit,
    onCancel,
  } = props;

  const {
    fileUtils,
  } = useApiStore();

  const handleUploadFile = async (file: File) => {
    const fileName = await fileUtils.uploadFile(file);
    console.log('from add Panel', fileName);
  };

  const formik = useFormik<ProjectRequest>({
    initialValues: mockProjectRequest,
    onSubmit: (values) => console.log(values),
  });

  const RsjfForm = defineRSJFForm<ProjectRequest>({
    type: 'object',
    properties: {
      name: {
        type: BasicWidgetSchemaType.String
      },
      imageUrl: {
        type: BasicWidgetSchemaType.String
      },
      createdDate: {
        type: BasicWidgetSchemaType.String,
        format: 'date'
      },
      deadLineDate: {
        type: BasicWidgetSchemaType.String,
        format: 'date'
      },
      lastUpdatedDate: {
        type: BasicWidgetSchemaType.String,
        format: 'date'
      },
      finishedDate: {
        type: BasicWidgetSchemaType.String,
        format: 'date'
      },
      sellPrice: {
        type: BasicWidgetSchemaType.Number
      },
      capital: {
        type: BasicWidgetSchemaType.Number
      },
      fail: {
        type: BasicWidgetSchemaType.Boolean
      },
      finish: {
        type: BasicWidgetSchemaType.Boolean
      },
      profitInPersen: {
        type: BasicWidgetSchemaType.Number
      },
      description: {
        type: BasicWidgetSchemaType.String,
      }
    }
  }, {
    description: {
      'ui:widget': 'textarea'
    }
  });

  return (
    <div
      className='project-dialog-request'
    >
      {RsjfForm}
    </div>
  );
};

export const FormAddNewProject = observer(FormAddNewProjectComponent);
