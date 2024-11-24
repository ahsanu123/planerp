import { observer } from "mobx-react-lite";
import { Column, DataTable } from "@primer/react/drafts";
import { Project } from "../../../model/generated/project";

interface ProjectListProps {
  data: Project[],
}

const ProjectListComponent = ({
  data
}: ProjectListProps) => {

  const columns: Array<Column<Project>> = [
    {
      header: 'Project Name'
    }
  ];
  return (

    <DataTable
      data={data}
      columns={columns}
    />
  );
};

export const ProjectList = observer(ProjectListComponent);
