import { Stack, Text } from "@primer/react";
import { SortableContainer } from "../../component/sortable/Sortable";
import { Table, DataTable } from "@primer/react/drafts";
import { Divider } from "@primer/react/lib-esm/ActionList/Divider";
import { MOCK_PROJECTS, MOCK_PROJECTS_COLUMNS } from "../project-page/ProjectPage";

export const ProjectListPage = () => (
  <Stack>
    <Text>
      All project you currently working on will shown here.
    </Text>

    <Stack
      direction='horizontal'
    >
      <SortableContainer
        group='DataTable'
        childrenIsDatatable
      >
        <Table.Container>
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
      </SortableContainer>
    </Stack>
    <Divider />
  </Stack>
);
