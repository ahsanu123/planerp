import { observer } from "mobx-react-lite";
import { Button, Link, Stack, Text } from "@primer/react";
import { Component } from "../../../model/generated/component";
import { Column, DataTable, Table } from "@primer/react/drafts";
import { ImageViewer } from "../ImageViewer";
import './TableComponent.scss';
import { InfoIcon } from "@primer/octicons-react";
import { FormatNumberAsCurrency } from "../../../shared/function";
import { format } from "date-fns";
import { useState } from "react";
import { SortableContainer } from "../../sortable/Sortable";

const MAX_COMPONENT_TO_SHOW = 4;

interface TableComponentProps {
  data?: any;
}

const MOCK_USED_COMPONENT: Array<Component> = [];

for (let i = 0; i < 50; i++) {
  MOCK_USED_COMPONENT.push(
    {
      name: `STM8F401VGTR2_${i + 1}`,
      type: '',
      imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20221230_STMicroelectronics-STM8S003F3P6TR_C52717_back.jpg',
      category: "MCU",
      description: "8KB 1KB FLASH 16 2.95V~5.5V STM8 16MHz TSSOP-20 Microcontrollers (MCU/MPU/SOC) ROHS",
      price: 0.2989,
      buyDate: new Date(),
      capital: 0.2989,
      supplier: "LCSC.COM",
      supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
      isAssembly: false,
      storageId: 0,
      id: 0,
      stock: 5,
    },
  );

}

const TableComponentComponent: React.FC<TableComponentProps> = (props) => {
  const [tableIndex, setTableIndex] = useState<number>(0);
  const renderRowComponent: Array<Column<Component>> = [
    {
      header: 'images',
      field: 'imageUrl',
      renderCell: (data) => (
        <Stack>
          <Text>
            {data.name}
          </Text>
          <ImageViewer
            className='table-component-image'
            imageUrl={data.imageUrl ?? ''}
            width='100px'
            height='100px'
            objectFit='contain'
          />
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
      header: 'price',
      field: 'price',
      renderCell: (data) => (
        <Stack>
          <Text>
            {FormatNumberAsCurrency(data.price, 'Us')} at {format(data.buyDate, 'MM/dd/yyyy')}
          </Text>
          <Text>
            {FormatNumberAsCurrency(data.price, 'Us')}  at {format(data.buyDate, 'MM/dd/yyyy')}
          </Text>
          <Button>
            Show All Price History
          </Button>
        </Stack>
      )
    },
    {
      header: 'stock',
      field: 'stock',
      renderCell: (data) => (
        <Stack>
          <Text>
            {data.stock} pcs at {format(data.buyDate, 'MM/dd/yyyy')}
          </Text>
          <Text>
            {data.stock} pcs at {format(data.buyDate, 'MM/dd/yyyy')}
          </Text>
          <Button>
            Show All Stock
          </Button>
        </Stack>
      ),
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
  const slicedUsedComponent = MOCK_USED_COMPONENT.slice(tableIndex * MAX_COMPONENT_TO_SHOW, (tableIndex * MAX_COMPONENT_TO_SHOW) + MAX_COMPONENT_TO_SHOW);

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
            data={slicedUsedComponent}
            columns={renderRowComponent}
          />
          <Table.Pagination
            aria-label='project pagination'
            totalCount={MOCK_USED_COMPONENT.length}
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
