import { observer } from "mobx-react-lite";
import { Component } from "../../../model/generated/component";
import { Label, Stack, Text } from "@primer/react";
import { TableComponent } from "../../../component/shared-component/table-component/TableComponent";
import { JsonValuePicker } from "../../../component/shared-component";
import { useMainStore } from "../../../store/useMainStore";

const MOCK_COMPONENTS: Component[] = [];
const PriceHistoryListComponent = () => {

  const {
    projectHistoryPageStore,
  } = useMainStore();

  return (
    <Stack>
      <Stack
        direction='horizontal'
      >
        <Stack.Item>
          <TableComponent />
        </Stack.Item>

        <Stack.Item>
          <JsonValuePicker
            onSave={() => console.log('onSave')}
            onDataChanged={(newData) => projectHistoryPageStore.SetSelectedApiPrice(newData)}
          />
        </Stack.Item>
      </Stack>

    </Stack>
  );
};

export const PriceHistoryList = observer(PriceHistoryListComponent);
