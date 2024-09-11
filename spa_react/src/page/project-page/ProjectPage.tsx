import { PageLayout } from "@primer/react";
import { observer } from "mobx-react-lite";


const ProjectPageComponent: React.FC = () => {

  const dummy = 'hel';

  return (
    <>
      <PageLayout>

        <PageLayout.Content>
          {dummy}
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};


export const ProjectPage = observer(ProjectPageComponent);
