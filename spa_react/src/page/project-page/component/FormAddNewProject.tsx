import { observer } from "mobx-react-lite";
import './FormAddNewProject.scss';
import { useFormik } from 'formik';
import { useApiStore } from "../../../api/api-store/useApiStore";
import { Project } from "../../../model/generated/project";
import { ProjectRequest } from "../../../model/project-request";
import { defineRSJFForm } from "../../../component/rsjf-primer/Utils";
import { BasicWidgetSchemaType } from "../../../component/rsjf-primer/RJSFCustomTypes";

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

  const RsjfForm = defineRSJFForm<ProjectRequest>({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: BasicWidgetSchemaType.String,
          defaultValue: ''
        },
        imageUrl: {
          type: BasicWidgetSchemaType.String,
          defaultValue: ''
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
          type: BasicWidgetSchemaType.Integer
        },
        capital: {
          type: BasicWidgetSchemaType.Integer
        },
        fail: {
          type: BasicWidgetSchemaType.Boolean
        },
        finish: {
          type: BasicWidgetSchemaType.Boolean
        },
        profitInPersen: {
          type: BasicWidgetSchemaType.Integer
        },
        description: {
          type: BasicWidgetSchemaType.String,
        }
      }
    },
    uiSchema: {
      description: {
        'ui:widget': 'textarea'
      }
    },
    onSubmit: (data) => console.log(data.formData),
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
