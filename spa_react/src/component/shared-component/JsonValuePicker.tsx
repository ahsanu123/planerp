import { Box, Button, Details, FormControl, Stack, Text, TextInput, useDetails } from "@primer/react";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import hljs from 'highlight.js';
import { fetchApiwrapper } from "../../shared/function";
import { API_BASE_URL } from "../../shared/constant";
// import './JsonValuePicker.scss';
import "highlight.js/scss/monokai.scss";
import { Banner } from "@primer/react/drafts";

// ref: https://blog.robbie.digital/posts/highlight-js

export const JsonValuePicker = () => {

  const [url, setUrl] = useState<string>('');
  const [jsonData, setJsonData] = useState<string>('');
  const [jsonObject, setJsonObject] = useState<any>();
  const [parsedPath, setParsedPath] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const codeRef = useRef<HTMLElement | null>(null);

  const onUrlChanged = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUrl(value);
  };
  const onPathChanged = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    try {
      const evaluated = eval(`jsonObject.${value}`);
      setParsedPath(evaluated);
      setErrorMessage(undefined);
    } catch (error) {
      console.error(error);
      setErrorMessage(String(error));
    }
  };

  const getJSONResult = async () => {
    const params = new URLSearchParams();
    params.append("url", url);
    const result = await fetchApiwrapper<any>(`${API_BASE_URL}/Util?${params.toString()}`, undefined, {
      method: 'GET',
      mode: 'cors'
    });
    setJsonObject(result);
    setJsonData(JSON.stringify(result, null, ' '));
  };

  useEffect(() => {
    if (!codeRef.current) return;
    hljs.highlightBlock(codeRef.current);
    hljs.highlightAll();
    getJSONResult();
  }, [url]);

  const { getDetailsProps } = useDetails({
    closeOnOutsideClick: true,
  });

  return (
    <Stack
      style={{
        padding: '10px 20px'
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
      <Stack.Item
        direction='horizontal'
      >
        <FormControl.Label>URL</FormControl.Label>
        <TextInput
          width='100%'
          onChange={onUrlChanged}
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
              {jsonData}
            </code>
          </pre>
        </Stack>
      </Stack.Item>

      <Stack.Item
        direction='horizontal'
      >
        <FormControl.Label>Path</FormControl.Label>
        <TextInput
          onChange={onPathChanged}
          width='100%'
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

      <Button>
        Save
      </Button>

    </Stack>
  );
};
