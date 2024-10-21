import { observer } from "mobx-react-lite";
import './FormAddNewProject.scss';
import { Button, Checkbox, FormControl, Stack, Textarea, TextInput } from "@primer/react";
import { ButtonInputFile } from "../../../component/shared-component/ButtonInputFile";
import { Field, Form, useFormik } from 'formik';
import { blankProject, blankProjectRequest } from "../../../model/blank-model";
import { useApiStore } from "../../../api/api-store/useApiStore";
import { Project } from "../../../model/generated/project";
import { ProjectRequest } from "../../../model/project-request";

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

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Stack
        direction='horizontal'
      >
        <Stack.Item>
          <FormControl.Label>
            Project Name
          </FormControl.Label>
          <TextInput
            name='name'
            type='text'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Stack.Item>

        <Stack.Item>
          <FormControl.Label>
            Thumbnail
          </FormControl.Label>
          <ButtonInputFile
            onFileSelected={(file) => handleUploadFile(file)}
          />
        </Stack.Item>

      </Stack>

      <Stack>
        <FormControl.Label>
          Deadline Date
        </FormControl.Label>
        <TextInput
          type='date'
          id='deadLineDate'
          name='deadLineDate'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.deadLineDate.toString()}
        />

        <FormControl.Label>
          Last Updated Date
        </FormControl.Label>
        <TextInput
          type='date'
          id='lastUpdateDate'
          name='lastUpdateDate'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastUpdatedDate.toString()}
        />

        <FormControl.Label>
          Finish Date
        </FormControl.Label>
        <TextInput
          type='date'
          id='finishDate'
          name='finishDate'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.finishedDate.toString()}
        />
      </Stack>

      <Stack>
        <Stack
          direction='horizontal'
        >
          <Stack.Item>
            <FormControl.Label>
              Capital
            </FormControl.Label>
            <TextInput
              leadingVisual='$'
              type='number'
              id='capital'
              name='capital'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.capital}
            />
          </Stack.Item>

        </Stack>

        <Stack.Item>
          <FormControl.Label>
            Description
          </FormControl.Label>
          <Textarea
            cols={70}
            id='description'
            name='description'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
        </Stack.Item>

      </Stack>

      <Stack
        direction='horizontal'
        align='end'
      >
        <Button
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button
          type='submit'
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export const FormAddNewProject = observer(FormAddNewProjectComponent);
