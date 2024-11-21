import { observer } from "mobx-react-lite";
import { Button, Link, Stack, Text } from "@primer/react";
import { Column, DataTable, Table } from "@primer/react/drafts";
import { ImageViewer } from "../ImageViewer";
import './TableComponent.scss';
import { InfoIcon } from "@primer/octicons-react";
import { FormatNumberAsCurrency } from "../../../shared/function";
import { useState } from "react";
import { Link as LinkDom } from "react-router-dom";
import { SortableContainer } from "../../sortable/Sortable";
import { Divider } from "@primer/react/lib-esm/deprecated/ActionList/Divider";
import { useMainStore } from "../../../store/useMainStore";
import { ComponentPriceHistory, PriceHistoryService } from "../../../api/auto-generated";
import { Component } from "../../../model/generated/component";
import { PriceHistoryList } from "../../../page/price-history-page/component/PriceHistoryList";

const MAX_COMPONENT_TO_SHOW = 4;

interface TableComponentProps {
  data?: any;
}


const TableComponentComponent = (props: TableComponentProps) => {

  const {
    projectHistoryPageStore,
  } = useMainStore();

  const usedComponents = projectHistoryPageStore.ProjectComponentList;

  const onEditPriceClicked = async (id: number) => {
    const { data, error } = await PriceHistoryService.priceHistoryGetApiPrice({
      path: {
        componentId: id
      }
    });

    console.log(data);
    projectHistoryPageStore.SetSelectedApiPrice(data as ComponentPriceHistory);
  };

  const [tableIndex, setTableIndex] = useState<number>(0);
  const renderRowComponent: Array<Column<Component>> = [
    {
      header: 'Images',
      field: 'imageUrl',
      renderCell: (data) => (
        <Stack
          className='table-image-header'
        >
          <Text
            className='table-image-header_text'
          >
            {data.name}
          </Text>
          <ImageViewer
            className='table-component-image'
            imageUrl={data.imageUrl ?? ''}
            width='100px'
            height='100px'
            objectFit='contain'
          />
          <Button
            onClick={() => onEditPriceClicked(data.id)}
          >
            Edit Api Price
          </Button>
          <Link
            inline
            href='#'
          >
            <InfoIcon size={16} /> {' '}
            Datasheet
          </Link>
        </Stack>
      ),
    },
    {
      header: 'Description',
      field: 'description',
      renderCell: (data) => (
        <Stack
          className='table-description-header'
        >
          <Text>
            {data.description}
          </Text>
          <Divider />
          <LinkDom
            to='#'
          >
            Price: {data.price}
          </LinkDom>
          <LinkDom
            to='#'
          >
            Current Stock:
            {data.stock}
          </LinkDom>

        </Stack>
      )
    },
    {
      header: 'count',
      field: 'storageId',
      renderCell: (data) => (
        <Text>
          use 9 pcs
        </Text>
      )
    },
    {
      header: 'total price',
      field: 'type',
      renderCell: (data) => (
        <Text>
          {FormatNumberAsCurrency(data.price * 5, 'Us')}
        </Text>
      )
    }
  ];
  const slicedUsedComponent = usedComponents.slice(tableIndex * MAX_COMPONENT_TO_SHOW, (tableIndex * MAX_COMPONENT_TO_SHOW) + MAX_COMPONENT_TO_SHOW);

  return (
    <Stack
      className='table-component-container'
    >
      <SortableContainer
        group='sliced'
        childrenIsDatatable
      >
        <Table.Container>
          <Table.Title
            id='table-title'
          >
            Used Component
          </Table.Title>
          <Table.Subtitle
            id='table-subtitle'
          >
            <Text>
              list of used component displayed here
            </Text>
            <Button>
              Add Component
            </Button>
          </Table.Subtitle>

          <DataTable
            data={usedComponents}
            columns={renderRowComponent}
          />
          <Table.Pagination
            aria-label='project pagination'
            totalCount={usedComponents.length}
            pageSize={MAX_COMPONENT_TO_SHOW}
            onChange={(state) => {
              console.log(state);
              setTableIndex(state.pageIndex);
            }}
          />

        </Table.Container>
      </SortableContainer>

    </Stack >
  );

};


export const TableComponent = observer(TableComponentComponent);
