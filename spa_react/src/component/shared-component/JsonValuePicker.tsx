import { Box, Button, Details, FormControl, Heading, Stack, Text, TextInput, useDetails } from "@primer/react";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import hljs from 'highlight.js';
import { fetchApiwrapper } from "../../shared/function";
import { API_BASE_URL } from "../../shared/constant";
import "highlight.js/scss/monokai.scss";
import { Banner } from "@primer/react/drafts";
import { observer } from "mobx-react-lite";
import { ComponentPriceHistory, UtilService } from "../../api/auto-generated";

interface JsonValuePickerProps {
  title?: string,
  data?: ComponentPriceHistory,
  onSave: () => void,
  onDataChanged: (newData: ComponentPriceHistory) => void,
}

const JsonValuePickerComponent = ({
  title,
  data,
  onSave,
  onDataChanged,
}: JsonValuePickerProps) => {

  const [jsonString, setJsonString] = useState<string>('');
  const [jsonObject, setJsonObject] = useState<any>();
  const [parsedPath, setParsedPath] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const codeRef = useRef<HTMLElement | null>(null);

  const _onUrlChanged = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const newData: ComponentPriceHistory = {
      ...data,
      url: value,
    };
    onDataChanged(newData);
  };
  const _onPathChanged = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    try {
      const path = `jsonObject.${value}`;
      const evaluated = eval(path);
      setParsedPath(evaluated);
      setErrorMessage(undefined);
    } catch (error) {
      console.error(error);
      setErrorMessage(String(error));
    }

    const newData: ComponentPriceHistory = {
      ...data,
      path: value,
    };
    onDataChanged(newData);
  };

  const getJSONResult = async () => {
    const result = await UtilService.utilGetJson({
      query: {
        url: data?.url
      }
    });
    const parsedData = JSON.parse((result.data as any) as string);
    setJsonObject(parsedData);
    setJsonString(JSON.stringify(parsedData, null, 1));
  };

  useEffect(() => {
    if (!codeRef.current) return;
    hljs.highlightBlock(codeRef.current);
    hljs.highlightAll();
    getJSONResult();
  }, [data?.url]);

  const { getDetailsProps } = useDetails({
    closeOnOutsideClick: true,
  });

  return (
    <>
      {data && (
        <Stack
          style={{
            padding: '10px 0'
          }}
        >
          {errorMessage && (
            <Banner
              title="Warning"
              description={
                <Text>Error When Parsing: {errorMessage}</Text>
              }
              variant="warning"
            />
          )}
          <Heading>
            {title}
          </Heading>
          <Stack.Item
            direction='horizontal'
          >
            <FormControl.Label>URL</FormControl.Label>
            <TextInput
              width='100%'
              onChange={_onUrlChanged}
              value={data.url ?? ''}
            />
          </Stack.Item>

          <Stack.Item>
            <FormControl.Label>JSON Result</FormControl.Label>
            <Stack>
              <pre
                className="json"
                style={{
                  height: '600px',
                  overflowY: 'scroll'
                }}
              >
                <code
                  ref={codeRef}
                >
                  {jsonString}
                </code>
              </pre>
            </Stack>
          </Stack.Item>

          <Stack.Item
            direction='horizontal'
          >
            <FormControl.Label>Path</FormControl.Label>
            <TextInput
              onChange={_onPathChanged}
              width='100%'
              value={data.path ?? ''}
            />
          </Stack.Item>
          <Stack.Item>
            <pre
              className="json"
              style={{
                height: '200px',
                overflowY: 'scroll'
              }}
            >
              <code            >
                {JSON.stringify(parsedPath, null, ' ')}
              </code>
            </pre>
          </Stack.Item>

          <Button
            onClick={onSave}
          >
            Save
          </Button>

        </Stack>
      )}
    </>
  );
};

export const JsonValuePicker = observer(JsonValuePickerComponent);
