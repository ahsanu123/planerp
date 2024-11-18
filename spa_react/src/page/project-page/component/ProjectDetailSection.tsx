import { observer } from "mobx-react-lite";
import { Project } from "../../../model/generated/project";
import { Header, Heading, Stack, Text } from "@primer/react";
import { ImageViewer } from "../../../component/shared-component";
import './ProjectDetailSection.scss';
import { TableComponent } from "../../../component/shared-component/table-component/TableComponent";
import { useState } from "react";
import { useApiStore } from "../../../api/api-store/useApiStore";


interface ProjectDetailSectionProps {
  name?: string;
}

const MOCK_PROJECT: Project = {
  name: "Tofu Control Panel Automation",
  deadLineDate: new Date(2024, 11),
  lastUpdatedDate: new Date(),
  finishedDate: new Date(),
  capital: 1000,
  description: "upgrade factory machinery with new technology.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam, ut sint illa vendibiliora, haec uberiora certe sunt. Ne discipulum abducam, times. Ita credo. Expectoque quid ad id, quod quaerebam, respondeas. Ita relinquet duas, de quibus etiam atque etiam consideret. Duo Reges: constructio interrete.",
  id: 0,
  imageUrl: "https://cdn-shop.adafruit.com/970x728/815-05.jpg",
  createdDate: new Date(),
  sellPrice: 0,
  fail: false,
  finish: false,
  profitInPersen: 0
};

const ProjectDetailSectionComponent: React.FC<ProjectDetailSectionProps> = (props) => {
  const {
    name,
  } = props;

  const {
    fileUtils,
  } = useApiStore();

  const [imageUrl, setImageUrl] = useState<string>(MOCK_PROJECT.imageUrl);

  return (
    <Stack
      className='project-detail-section'
    >
      <Heading>
        {MOCK_PROJECT.name}
      </Heading>
      <Stack>
        <Stack.Item
          className='project-detail-image'
        >
          <ImageViewer
            onImageUrlChanged={(filename) => {
              setImageUrl(fileUtils.buildImageUrl(filename));
            }}
            imageUrl={imageUrl}
            caption={MOCK_PROJECT.name}
            width='400px'
            height='400px'
            objectFit='contain'
            showChangeButton
          />
        </Stack.Item>
        <Text>
          {MOCK_PROJECT.description}
        </Text>

        <TableComponent />

      </Stack>
    </Stack>
  );
};

export const ProjectDetailSection = observer(ProjectDetailSectionComponent);
