import { Box, Heading, PageLayout, Stack, StateLabel } from '@primer/react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { EditableTab } from '../../component/shared-component/editable-tab/EditableTab';
import { EditableTabModel } from '../../model';
import './Dashboard.scss';

const MOCK_TAB: EditableTabModel[] = [
  {
    title: 'Active Project',
    content: <p>Active Project Content</p>
  },
  {
    title: 'Notes',
    content: <p>Important Notes</p>
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
            justify='center'
          >
            <h2
              className='dashboard-header-title'
            >
              🥑 planerp
            </h2>
          </Stack>

          <Stack
            align='center'
          >
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
