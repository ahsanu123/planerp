import { Button, PageLayout } from "@primer/react";
import { observer } from "mobx-react-lite";
import { Column } from "@primer/react/drafts";
import { formatDistanceToNow } from "date-fns";
import { DoubleClickEditor } from "../../component/shared-component/DoubleClickEditor";
import { useState } from "react";
import { CustomDialog } from "../../component/shared-component/CustomDialog";
import { FormGenerator } from "../../component/shared-component/FormGenerator";
import { FormAddNewProject } from "./component/FormAddNewProject";
import { Project } from "../../model/generated/project";
import { FormatNumberAsCurrency } from "../../shared/function";
import { GitCommitIcon } from "@primer/octicons-react";
import { TimelineModel } from "../../model";
import { ImageSliderMock } from "../../component/shared-component/Swipper";
import { ProjectGetError, ProjectService } from "../../api/auto-generated";
import { ProjectList } from "./component/ProjectList";
import { useMainStore } from "../../store/useMainStore";

export const MOCK_PROJECTS: Project[] = [
  {
    name: "Tofu Control Panel Automation",
    deadLineDate: new Date(2024, 11),
    lastUpdatedDate: new Date(),
    finishedDate: new Date(),
    capital: 1000,
    description: "upgrade factory machinery with new technology",
    id: 0,
    imageUrl: "",
    createdDate: new Date(),
    sellPrice: 0,
    fail: false,
    finish: false,
    profitInPersen: 0
  },
  {
    name: "Sudi Keyboard V2 - Split Keyboard",
    deadLineDate: new Date(2024, 11),
    lastUpdatedDate: new Date(),
    finishedDate: new Date(),
    capital: 1000,
    description: "upgrade factory machinery with new technology",
    id: 0,
    imageUrl: "",
    createdDate: new Date(),
    sellPrice: 0,
    fail: false,
    finish: false,
    profitInPersen: 0
  },
  {
    name: "Coagulant Machine",
    deadLineDate: new Date(2024, 11),
    lastUpdatedDate: new Date(),
    finishedDate: new Date(),
    capital: 1000,
    description: "upgrade factory machinery with new technology",
    id: 0,
    imageUrl: "",
    createdDate: new Date(),
    sellPrice: 0,
    fail: false,
    finish: false,
    profitInPersen: 0
  },
];

export const MOCK_TIMELINE: TimelineModel[] = [
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
  {
    icon: GitCommitIcon,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de"
  },
];
export const MOCK_PROJECTS_COLUMNS: Column<Project>[] = [
  {
    header: 'Name',
    field: 'name',
    renderCell: (data) => (
      <DoubleClickEditor
        value={data.name}
        onDoubleClicked={(status) => undefined}
      />
    ),
  },
  {
    header: 'Capital',
    field: 'capital',
    renderCell: (data) => (<span>{FormatNumberAsCurrency(data.capital)}</span>),
  },
  {
    header: 'Dead Line',
    field: 'deadLineDate',
    renderCell: (data) => (<span>{formatDistanceToNow(data.deadLineDate)}</span>)
  },
  {
    header: 'Dead Line',
    field: 'deadLineDate',
    renderCell: (data) => (<span>{formatDistanceToNow(data.deadLineDate)}</span>)
  },
  {
    header: 'Dead Line',
    field: 'deadLineDate',
    renderCell: (data) => (<span>{formatDistanceToNow(data.deadLineDate)}</span>)
  },
  {
    header: 'Dead Line',
    field: 'deadLineDate',
    renderCell: (data) => (<span>{formatDistanceToNow(data.deadLineDate)}</span>)
  },
];

const ProjectPageComponent: React.FC = () => {

  const {
    projectPageStore
  } = useMainStore();

  const [isShowAddDialog, setIsShowAddDialog] = useState<boolean>(false);

  const handleOnAddNewProject = async (data: Project) => {
    await ProjectService.projectAddNew({
      body: data,
    });
  };

  return (
    <PageLayout>
      <PageLayout.Header>
        <ImageSliderMock />
        <Button
          onClick={() => setIsShowAddDialog(true)}
        >
          Add Project
        </Button>
      </PageLayout.Header>

      <PageLayout.Content>
        <ProjectList
          data={projectPageStore.ProjectList}
        />
      </PageLayout.Content>

      <PageLayout.Pane
        width='large'
      >
        {/* <CondenseTimeline */}
        {/*   title='Project Log History' */}
        {/*   timeLine={MOCK_TIMELINE} */}
        {/* /> */}
      </PageLayout.Pane>

      {
        isShowAddDialog && (
          <CustomDialog
            title='New Project'
            isOpen={isShowAddDialog}
            onDismiss={() => setIsShowAddDialog(false)}
            onConfirm={() => setIsShowAddDialog(false)}
            content={
              <FormAddNewProject
                onCancel={() => setIsShowAddDialog(false)}
                onSubmit={handleOnAddNewProject}
              />
            }
          />
        )
      }
    </PageLayout>
  );
};


export const ProjectPage = observer(ProjectPageComponent);
