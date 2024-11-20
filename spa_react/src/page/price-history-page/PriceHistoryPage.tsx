import { observer } from "mobx-react-lite";
import { Heading, PageLayout, Stack, Text } from "@primer/react";
import { JsonValuePicker } from "../../component/shared-component";
import { TableComponent } from "../../component/shared-component/table-component/TableComponent";
import './PriceHistoryPage.scss';

const PriceHistoryPageComponent = () => {
  return (
    <PageLayout>
      <PageLayout.Header>
        <Heading
          as='h2'
        >
          <Text>
            Component List of Project
          </Text>
        </Heading>
      </PageLayout.Header>

      <PageLayout.Content
        width='medium'
      >
        <TableComponent />
      </PageLayout.Content>


      <PageLayout.Pane
        width='large'
        sticky
      >
        <JsonValuePicker />
      </PageLayout.Pane>


    </PageLayout>
  );
};

export const PriceHistoryPage = observer(PriceHistoryPageComponent);
