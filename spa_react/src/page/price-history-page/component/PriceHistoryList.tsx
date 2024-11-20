import { observer } from "mobx-react-lite";
import { Component } from "../../../model/generated/component";
import { Label, Stack, Text } from "@primer/react";
import { TableComponent } from "../../../component/shared-component/table-component/TableComponent";
import { JsonValuePicker } from "../../../component/shared-component";

const MOCK_COMPONENTS: Component[] = [];
const PriceHistoryListComponent = () => {
  return (
    <Stack>
      <Stack
        direction='horizontal'
      >
        <Stack.Item>
          <TableComponent />
        </Stack.Item>

        <Stack.Item>
          <JsonValuePicker />
        </Stack.Item>
      </Stack>

    </Stack>
  );
};

export const PriceHistoryList = observer(PriceHistoryListComponent);
