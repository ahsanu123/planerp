import { observer } from "mobx-react-lite";
import { Button, Link, Stack, Text } from "@primer/react";
import { Component } from "../../../model/generated/component";
import { Column, DataTable, Table } from "@primer/react/drafts";
import { ImageViewer } from "../ImageViewer";
import './TableComponent.scss';
import { InfoIcon } from "@primer/octicons-react";
import { FormatNumberAsCurrency } from "../../../shared/function";
import { format } from "date-fns";

interface TableComponentProps {
  data?: any;
}

const MOCK_USED_COMPONENT: Array<Component> = [
  {
    name: "STM8F401VGTR2",
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
  {
    stock: 5,
    name: "STM8F401VGTR2",
    type: '',
    imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20221230_STMicroelectronics-STM8S003F3P6TR_C52717_back.jpg',
    category: "MCU",
    description: "8KB 1KB FLASH 16 2.95V~5.5V STM8 16MHz TSSOP-20 Microcontrollers (MCU/MPU/SOC) ROHS",
    price: 0.2989,
    capital: 0.2989,
    supplier: "LCSC.COM",
    supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
    isAssembly: false,
    storageId: 0,
    buyDate: new Date(),
    id: 0
  },
  {
    stock: 5,
    buyDate: new Date(),
    name: "STM8F401VGTR2",
    type: '',
    imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20221230_STMicroelectronics-STM8S003F3P6TR_C52717_back.jpg',
    category: "MCU",
    description: "8KB 1KB FLASH 16 2.95V~5.5V STM8 16MHz TSSOP-20 Microcontrollers (MCU/MPU/SOC) ROHS",
    price: 0.2989,
    capital: 0.2989,
    supplier: "LCSC.COM",
    supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
    isAssembly: false,
    storageId: 0,
    id: 0
  },
  {
    name: "STM8F401VGTR2",
    type: '',
    imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20221230_STMicroelectronics-STM8S003F3P6TR_C52717_back.jpg',
    category: "MCU",
    description: "8KB 1KB FLASH 16 2.95V~5.5V STM8 16MHz TSSOP-20 Microcontrollers (MCU/MPU/SOC) ROHS",
    price: 0.2989,
    capital: 0.2989,
    supplier: "LCSC.COM",
    supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
    isAssembly: false,
    buyDate: new Date(),
    storageId: 0,
    id: 0,
    stock: 5,
  },
  {
    buyDate: new Date(),
    name: "STM8F401VGTR2",
    stock: 5,
    type: '',
    imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20221230_STMicroelectronics-STM8S003F3P6TR_C52717_back.jpg',
    category: "MCU",
    description: "8KB 1KB FLASH 16 2.95V~5.5V STM8 16MHz TSSOP-20 Microcontrollers (MCU/MPU/SOC) ROHS",
    price: 0.2989,
    capital: 0.2989,
    supplier: "LCSC.COM",
    supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
    isAssembly: false,
    storageId: 0,
    id: 0
  },
];

const TableComponentComponent: React.FC<TableComponentProps> = (props) => {
  const renderRowComponent: Array<Column<Component>> = [
    {
      header: 'images',
      field: 'imageUrl',
      renderCell: (data) => (
        <Stack>
          <ImageViewer
            className='table-component-image'
            imageUrl={data.imageUrl ?? ''}
          />
          <Link
            inline
            href='#'
          >
            <InfoIcon size={16} /> {' '}
            Datasheet
          </Link>
          <Text>
          </Text>
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
    }
  ];
  return (
    <Stack
      className='table-component-container'
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
          list of used component displayed here
        </Table.Subtitle>

        <DataTable
          data={MOCK_USED_COMPONENT}
          columns={renderRowComponent}
        />

      </Table.Container>

    </Stack>
  );

};


export const TableComponent = observer(TableComponentComponent);
