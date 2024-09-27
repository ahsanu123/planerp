import { observer } from "mobx-react-lite";
import './FormAddNewProject.scss';
import { Button, Checkbox, FormControl, Stack, Textarea, TextInput } from "@primer/react";
import { Project, ProjectRequest } from "../../../model";
import { ButtonInputFile } from "../../../component/shared-component/ButtonInputFile";
import { Field, Form, useFormik } from 'formik';
import { blankProject, blankProjectRequest } from "../../../model/blank-model";

interface FormAddNewProjectProps {
  data: Project
  onSubmit: (value: ProjectRequest) => void;
  onCancel: () => void;
}

// bomId: number,
// resourceDocumentId: number,
// procedureId: number,
// logId: number,
// name: string,
// deadLineDate: Date,
// lastUpdateDate: Date,
// finishDate: Date,
// planedSellPrice: number,
// capital: number,
// isArchived: boolean,
// profitInPercent: number,
// description: string,

const FormAddNewProjectComponent: React.FC<FormAddNewProjectProps> = (props) => {
  const {
    data,
    onSubmit,
    onCancel,
  } = props;

  const formik = useFormik<ProjectRequest>({
    initialValues: blankProjectRequest,
    onSubmit: (values) => onSubmit(values)
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
          <ButtonInputFile />
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
          value={formik.values.lastUpdateDate.toString()}
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
          value={formik.values.finishDate.toString()}
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

          <Stack.Item>
            <FormControl.Label>
              Planed Sell Price
            </FormControl.Label>
            <TextInput
              leadingVisual='$'
              type='number'
              name='planedSellPrice'
              id='planedSellPrice'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.planedSellPrice}
            />
          </Stack.Item>
        </Stack>

        <Stack>
          <Stack.Item>
            <FormControl>
              <Checkbox
                type='checkbox'
                name='isArchived'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isArchived ? 'true' : 'false'}
              />
              <FormControl.Label>
                Archived
              </FormControl.Label>
            </FormControl>
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
