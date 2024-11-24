import { observer } from "mobx-react-lite";
import { Heading, PageLayout, Stack, Text } from "@primer/react";
import { ImageViewer, JsonValuePicker } from "../../component/shared-component";
import { TableComponent } from "../../component/shared-component/table-component/TableComponent";
import './PriceHistoryPage.scss';
import { useMainStore } from "../../store/useMainStore";
import { PriceHistoryService } from "../../api/auto-generated";

const PriceHistoryPageComponent = () => {
  const {
    projectHistoryPageStore
  } = useMainStore();

  const onJsonValuePickerSave = async () => {
    const currentApiPriceData = projectHistoryPageStore.SelectedApiPrice;
    if (!currentApiPriceData) return;

    await PriceHistoryService.priceHistoryUpsertPriceHistory({
      body: currentApiPriceData,
    });
  };

  return (
    <PageLayout>
      <PageLayout.Header>
        <Heading
          as='h2'
        >
          <ImageViewer
            imageUrl='https://cdnb.artstation.com/p/assets/images/images/000/488/525/large/lekso-tiger-art-test-for-banner-saga-by-leksotiger-d8irhmz.jpg?1424529598'
            width='100%'
          />
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
        <JsonValuePicker
          data={projectHistoryPageStore.SelectedApiPrice}
          onSave={onJsonValuePickerSave}
          onDataChanged={(newData) => projectHistoryPageStore.SetSelectedApiPrice(newData)}
        />
      </PageLayout.Pane>


    </PageLayout>
  );
};

export const PriceHistoryPage = observer(PriceHistoryPageComponent);
