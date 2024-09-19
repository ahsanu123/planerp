import { observer } from "mobx-react-lite";
import { Button, FormControl, Stack, TextInput, Tooltip } from "@primer/react";
import { TabPanels } from '@primer/react/experimental';
import { EditableTabModel } from "../../../model";
import { PencilIcon } from "@primer/octicons-react";
import './EditableTab.scss';
import { useState } from "react";
import { CustomDialog } from "../CustomDialog";

interface EditableTabProps {
  tabs: EditableTabModel[];
  onTitleRenamed: (tabTitle: string) => void;
}

const EditableTabComponent: React.FC<EditableTabProps> = (props) => {

  const {
    tabs,
    onTitleRenamed,
  } = props;

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState<boolean>(false);

  const handleOnTabDoubleClick = () => {
    setIsRenameDialogOpen(true);
  };

  const renameTabTitleComponent = () => (
    <Stack>
      <FormControl>
        <FormControl.Label>
          Rename Title
        </FormControl.Label>

        <TextInput />

      </FormControl>
    </Stack>
  );

  const renderTabs = (tab: EditableTabModel) => (
    <>
      <TabPanels.Tab
        onDoubleClick={handleOnTabDoubleClick}
      >
        {tab.title}

        <Tooltip
          text='double click to edit'
          direction='s'
        >
          <PencilIcon size={16} />
        </Tooltip>

      </TabPanels.Tab>

      <TabPanels.Panel>
        {tab.content}
      </TabPanels.Panel>
    </>
  );

  return (
    <>
      <div
        className='editable-tab-container'
      >
        <TabPanels
          defaultTabIndex={0}
        >
          {tabs.map((tab) => renderTabs(tab))}

          <TabPanels.Tab>
            <Button>Add +</Button>
          </TabPanels.Tab>
        </TabPanels>
      </div>

      <CustomDialog
        title='Rename Tab'
        sortDescription='rename your tabs title'
        onDismiss={() => setIsRenameDialogOpen(false)}
        onConfirm={() => setIsRenameDialogOpen(false)}
        isOpen={isRenameDialogOpen}
        content={renameTabTitleComponent()}
      />
    </>
  );
};

export const EditableTab = observer(EditableTabComponent);
