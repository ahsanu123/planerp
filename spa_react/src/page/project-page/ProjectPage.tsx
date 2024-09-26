import { Button } from "@primer/react";
import { observer } from "mobx-react-lite";
import { Project } from "../../model";
import { Column, DataTable, Table } from "@primer/react/drafts";
import { format, formatDistanceToNow } from "date-fns";
import { DoubleClickEditor } from "../../component/shared-component/DoubleClickEditor";
import { useState } from "react";
import { CustomDialog } from "../../component/shared-component/CustomDialog";
import { FormGenerator } from "../../component/shared-component/form-generator";

const MOCK_PROJECTS: Project[] = [
  {
    bomId: 0,
    resourceDocumentId: 0,
    procedureId: 0,
    logId: 0,
    name: "Coagulant Machine",
    deadLineDate: new Date(2024, 11),
    lastUpdateDate: new Date(),
    finishDate: new Date(),
    planedSellPrice: 10000,
    capital: 1000,
    isArchived: false,
    profitInPercent: 10,
    description: "Coagulant Machine For Automatic Tofu Maker",
    id: 0
  },
  {
    bomId: 0,
    resourceDocumentId: 0,
    procedureId: 0,
    logId: 0,
    name: "Sudi Keyboard V2 - Split Keyboard",
    deadLineDate: new Date(2025, 1),
    lastUpdateDate: new Date(2025, 2),
    finishDate: new Date(),
    planedSellPrice: 500000,
    capital: 250000,
    isArchived: false,
    profitInPercent: 10,
    description: "36 Wireless Split Keyboard based on Nrf52832",
    id: 0
  },
];

const ProjectPageComponent: React.FC = () => {

  const MOCK_PROJECTS_COLUMNS: Column<Project>[] = [
    {
      header: 'Name',
      field: 'name',
      renderCell: (data) => (
        <DoubleClickEditor
          value={data.name}
          onDoubleClicked={handleOnDoubleClicked}
        />
      ),
    },
    {
      header: 'Planed Sell Price',
      field: 'planedSellPrice',
      renderCell: (data) => (<span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.planedSellPrice)}</span>),
    },
    {
      header: 'Capital',
      field: 'capital',
      renderCell: (data) => (<span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.capital)}</span>),
    },
    {
      header: 'Dead Line',
      field: 'deadLineDate',
      renderCell: (data) => (<span>{formatDistanceToNow(data.deadLineDate)}</span>)
    },
    {
      header: 'Last updated',
      field: 'lastUpdateDate',
      renderCell: (data) => (<span>{format(data.lastUpdateDate, 'PPPPpp')}</span>)
    }
  ];

  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const handleOnDoubleClicked = (status: boolean) => {
    setIsShowDialog(status);
  };

  return (
    <>
      <Button>Add Project</Button>
      <Table.Container>
        <Table.Title
          id='project'
        >
          Projects
        </Table.Title>
        <Table.Subtitle
          id='project-subtitle'
        >
          All project you currently working on will shown here.
        </Table.Subtitle>
        <DataTable
          data={MOCK_PROJECTS}
          columns={MOCK_PROJECTS_COLUMNS}
        />

        <Table.Pagination
          aria-label='project pagination'
          totalCount={MOCK_PROJECTS.length}
          pageSize={4}
        />

      </Table.Container>
      <CustomDialog
        title='Table Content Editor'
        isOpen={isShowDialog}
        onDismiss={() => setIsShowDialog(false)}
        onConfirm={() => setIsShowDialog(false)}
        content={<FormGenerator data={MOCK_PROJECTS[0]} />}
      />
    </>
  );
};


export const ProjectPage = observer(ProjectPageComponent);
