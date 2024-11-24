import { observer } from "mobx-react-lite";
import './FormAddNewProject.scss';
import { Project } from "../../../model/generated/project";
import { ProjectRequest } from "../../../model/project-request";
import { defineRSJFForm } from "../../../component/rsjf-primer/Utils";
import { BasicWidgetSchemaType } from "../../../component/rsjf-primer/RJSFCustomTypes";

interface FormAddNewProjectProps {
  onSubmit: (value: Project) => void;
  onCancel: () => void;
}

const FormAddNewProjectComponent: React.FC<FormAddNewProjectProps> = (props) => {
  const {
    onSubmit,
    onCancel,
  } = props;


  const RsjfForm = defineRSJFForm<Project>({
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
    onSubmit: (data) => data.formData && onSubmit(data.formData),
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
