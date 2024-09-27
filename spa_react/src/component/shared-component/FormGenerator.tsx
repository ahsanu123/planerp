import { Button, Checkbox, FormControl, PageLayout, Stack, Textarea, TextInput } from "@primer/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { camelCaseToSpaced, isOnlyDigitNumber } from "../../shared/function";
import './FormGenerator.scss';

const MAX_SHORT_TEXT_LENGTH = 50;

interface FormGeneratorProps {
  data: any;
  confirmText?: string;
  cancelText?: string;
  onDataChanged?: (data: any) => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const FormGeneratorComponent: React.FC<FormGeneratorProps> = (props) => {

  const {
    data,
    confirmText = 'Submit',
    cancelText = 'Cancel',
    onDataChanged,
    onSubmit,
    onCancel,
  } = props;

  const [formData, setFormData] = useState(data);
  const dataInputTypes: { [key: string]: React.HTMLInputTypeAttribute } = {};

  const whatInputType = (type: any): React.HTMLInputTypeAttribute => {
    if (!Number.isNaN(parseFloat(type)) && isOnlyDigitNumber(type)) return 'number';
    if (type instanceof Date) return 'date';
    if (typeof type === 'boolean') return 'checkbox';
    return 'text';
  };

  Object.keys(data).forEach((key) => {
    const keyAndType: any = {};
    keyAndType[key] = whatInputType(data[key]);

    Object.assign(dataInputTypes, keyAndType);
  });
  const handleInputChanged = (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedFormData = { ...formData };
    const value = event.target.value;

    if (dataInputTypes[key] === 'checkbox') updatedFormData[key] = value === 'true' ? true : false;
    else if (dataInputTypes[key] === 'number') updatedFormData[key] = !isNaN(parseFloat(value)) ? parseFloat(value) : 0;
    else if (dataInputTypes[key] === 'date') updatedFormData[key] = new Date(value);
    else updatedFormData[key] = value;

    if (onDataChanged) onDataChanged(updatedFormData);
    setFormData(updatedFormData);
  };

  const generateForm = () => {
    const keys = Object.keys(formData).filter((key) => !key.toLowerCase().includes('id'));

    const renderFormComponent = (type: React.HTMLInputTypeAttribute, key: any) => {
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

      <PageLayout.Footer>
        <Stack
          direction='horizontal'
          justify='end'
          className='custom-dialog-footer'
          style={{
            padding: '20px',
          }}
        >
          <Button
            onClick={() => onCancel()}
          >
            {cancelText}
          </Button>

          <Button
            onClick={() => onSubmit(formData)}
          >
            {confirmText}
          </Button>
        </Stack>
      </PageLayout.Footer>

    </PageLayout>
  );

};

export const FormGenerator = observer(FormGeneratorComponent);

