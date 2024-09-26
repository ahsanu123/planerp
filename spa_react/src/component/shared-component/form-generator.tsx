import { FormControl, PageLayout, Stack, TextInput } from "@primer/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { camelCaseToSpaced } from "../../shared/function";
import './form-generator.scss';
import { BookmarkBlockService } from "@blocksuite/blocks/dist/index.js";

interface FormGeneratorProps {
  data: any
}

const FormGeneratorComponent: React.FC<FormGeneratorProps> = (props) => {

  const {
    data,
  } = props;

  const [formData, setFormData] = useState(data);

  const generateForm = () => {
    const keys = Object.keys(formData).filter((key) => !key.toLowerCase().includes('id'));
    const whatInputType = (type: any): React.HTMLInputTypeAttribute => {
      switch (type) {
        case (type instanceof Date):
          return 'date';
        case (type instanceof Number):
          return 'number';
        case (type instanceof Boolean):
          return 'checkbox';
        default:
          return 'text';
      }
    };

    return (
      <>
        {keys.map((key) => (
          <>
            <FormControl.Label>
              {camelCaseToSpaced(key)}
            </FormControl.Label>
            {typeof formData[key]}
            <TextInput
              value={formData[key]}
              type={whatInputType(typeof formData[key])}
            />
          </>
        ))}
      </>
    );
  };

  return (
    <PageLayout>
      <PageLayout.Header>
        Form Generator V1
      </PageLayout.Header>
      <PageLayout.Content>
        <Stack
          className='form-generator-container'
        >
          {generateForm()}
        </Stack>
      </PageLayout.Content>
    </PageLayout>
  );

};

export const FormGenerator = observer(FormGeneratorComponent);

