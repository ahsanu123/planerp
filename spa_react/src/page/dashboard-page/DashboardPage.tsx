import { PageLayout, Stack } from '@primer/react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { EditableTab } from '../../component/shared-component/editable-tab/EditableTab';
import { EditableTabModel } from '../../model';
import './Dashboard.scss';
import { MermaidDiagramMock } from '../../component/mermaid-diagram/mermaid-diagram-mock';
import { ProjectPage } from '../project-page/ProjectPage';
import { StockAndComponentPage } from '../stock-and-component-page/StockAndComponentPage';

const MOCK_TAB: EditableTabModel[] = [
  {
    title: 'Mermaid Digram Component',
    content: <MermaidDiagramMock />
  },
  {
    title: 'Project',
    content: <ProjectPage />,
  },
  {
    title: 'Stock And Component',
    content: <StockAndComponentPage />
  },
  {
    title: 'Reports',
    content: <p>Reporting</p>
  },
];

const DashboardPageComponent: React.FC = () => {

  return (
    <div
      className='dashboard-container'
    >
      <PageLayout>
        <PageLayout.Header>
          <Stack
            direction='horizontal'
            justify='start'
          >
            <h2
              className='dashboard-header-title'
            >
              🥑 planerp
            </h2>
          </Stack>
          <Stack>
            Your Personal Project Planner and Management
          </Stack>
        </PageLayout.Header>

        <PageLayout.Content>

          <div
            className='main-content'
          >
            <EditableTab
              tabs={MOCK_TAB}
              onTitleRenamed={(tabTitle) => console.log(tabTitle)}
            />
          </div>

        </PageLayout.Content>

        <PageLayout.Footer>
          ❤️ Made With Love By Ah
        </PageLayout.Footer>
      </PageLayout>
    </div>
  );
};

export const DashboardPage = observer(DashboardPageComponent);
