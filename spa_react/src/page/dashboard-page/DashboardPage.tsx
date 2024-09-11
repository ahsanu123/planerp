import { Box, Heading, PageLayout, StateLabel } from '@primer/react';
import './Dashboard.scss';
import { useMainStore } from '../../store/useMainStore';
import { observer } from 'mobx-react-lite';
import { ChevronLeftIcon } from '@primer/octicons-react';

const DashboardPageComponent: React.FC = () => {

  const {
    dashboardPageStore
  } = useMainStore();

  const handleOnclick = () => {
    dashboardPageStore.setTitle();
  };

  return (
    <>
      <PageLayout>
        <PageLayout.Header>
          <h2>Header</h2>
        </PageLayout.Header>

        <PageLayout.Content>
          <Box m={4}>
            <Heading as="h2" sx={{ mb: 20 }}>
              Hello, world!
              <ChevronLeftIcon size={12} />
            </Heading>
            <StateLabel status="pullOpened">Open</StateLabel>
            <h2>{dashboardPageStore.title}</h2>

            <p>This will get Primer text styles.</p>
            <button
              onClick={handleOnclick}
            >
              click Me
            </button>
          </Box>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export const DashboardPage = observer(DashboardPageComponent);
