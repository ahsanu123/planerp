import { Checkbox, FormControl, PageLayout, Stack, Textarea, TextInput } from "@primer/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { camelCaseToSpaced } from "../../shared/function";
import './form-generator.scss';

const MAX_SHORT_TEXT_LENGTH = 25;

interface FormGeneratorProps {
  data: any;
  onDataChanged: (data: any) => void;
  onCancel?: (data: any) => void;
}

const FormGeneratorComponent: React.FC<FormGeneratorProps> = (props) => {

  const {
    data,
    onDataChanged,
    onCancel,
  } = props;

  const [formData, setFormData] = useState(data);

  const handleInputChanged = (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const updatedFormData = { ...formData };

    if (event.target.value === 'true' || event.target.value === 'false') updatedFormData[key] = event.target.value === 'true' ? true : false;
    else if (!Number.isNaN(parseFloat(event.target.value))) updatedFormData[key] = parseFloat(event.target.value);
    else if (new Date(event.target.value).toString() !== 'Invalid Date') updatedFormData[key] = new Date(event.target.value);
    else updatedFormData[key] = event.target.value;

    onDataChanged(updatedFormData);
    setFormData(updatedFormData);
  };

  const generateForm = () => {
    const keys = Object.keys(formData).filter((key) => !key.toLowerCase().includes('id'));

    const whatInputType = (type: any): React.HTMLInputTypeAttribute => {
      if (!Number.isNaN(parseFloat(type))) return 'number';
      if (type instanceof Date) return 'date';
      if (typeof type === 'boolean') return 'checkbox';
      return 'text';
    };

    const renderFormComponent = (type: React.HTMLInputTypeAttribute, key: any) => {
      console.log(key, type);
      switch (type) {
        case 'text':
          return (
            <>
              {
                ((formData[key] as string).length > MAX_SHORT_TEXT_LENGTH)
                  ? (
                    <>
                      <FormControl.Label>
                        {camelCaseToSpaced(key)}
                      </FormControl.Label>
                      <Textarea
                        onChange={(event) => handleInputChanged(key, event)}
                        value={formData[key]}
                      />
                    </>
                  )
                  : (
                    <>
                      <FormControl.Label>
                        {camelCaseToSpaced(key)}
                      </FormControl.Label>
                      <TextInput
                        onChange={(event) => handleInputChanged(key, event)}
                        value={formData[key]}
                        type={whatInputType(formData[key])}
                      />
                    </>
                  )
              }
            </>
          );

        case 'checkbox':
          return (
            <FormControl>
              <Checkbox
                value={formData[key]}
                onChange={(event) => handleInputChanged(key, event)}
              />
              <FormControl.Label>
                {camelCaseToSpaced(key)}
              </FormControl.Label>
            </FormControl>
          );

        case 'date':
          return (
            <>
              <FormControl.Label>
                {camelCaseToSpaced(key)}
              </FormControl.Label>
              <TextInput
                onChange={(event) => handleInputChanged(key, event)}
                value={(formData[key] as Date).toISOString().split('T')[0]}
                type='date'
              />
            </>
          );

        case 'number':
          return (
            <>
              <FormControl.Label>
                {camelCaseToSpaced(key)}
              </FormControl.Label>
              <TextInput
                onChange={(event) => handleInputChanged(key, event)}
                value={formData[key]}
                type='number'
              />
            </>
          );
      }
    };

    return (
      <>
        {keys.map((key, index) => (
          <Stack
            key={index}
          >
            {renderFormComponent(whatInputType(formData[key]), key)}
          </Stack>
        ))}
      </>
    );
  };

  return (
    <PageLayout>
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

