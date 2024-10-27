import { observer } from 'mobx-react-lite';
import { Text, Button, ActionList, ActionMenu, Checkbox, Stack, TextInput, Select, SelectPanel, Dialog, AnchoredOverlay, Box, IconButton } from '@primer/react';
import { useState } from 'react';
import { CheckIcon, CrossReferenceIcon, GrabberIcon, HeartIcon, SquareFillIcon } from '@primer/octicons-react';
import './ProjectProperties.scss';
import { Divider } from '@primer/react/lib-esm/deprecated/ActionList/Divider';
import { CrossIcon } from '@blocksuite/blocks/dist/index.js';
import { ButtonIcon } from '../ButtonIcon';

export enum ProjectPropertiesTypes {
  Text,
  Number,
  Select,
  MultiSelect,
  Status,
  Date,
  Person,
  FileAndMedia,
  Checkbox,
  Url,
  Email,
  Phone,
  Formula,
  Relation,
  Rollup,
  CreatedTime,
  LastEditedTime,
  LastEditedBy,
  Button,
  Id,
}

type ActionMenuVariantType = 'default' | 'danger';
type ActionMenuOverlaySize =
  'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'auto';

interface ActionMenuItem {
  title?: string;
  variant?: ActionMenuVariantType;
  type: ProjectPropertiesTypes;
  trailingVisual?: string | JSX.Element;
  divider?: boolean;
  onSelect?: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  subMenu?: ActionMenuProps;
}
interface ActionMenuProps {
  buttonTitle: string;
  overlaySize: ActionMenuOverlaySize;
  items: Array<ActionMenuItem>;
}


const MOCK_ACTION_MENUS: ActionMenuProps =
{
  buttonTitle: 'Add Property',
  overlaySize: 'small',
  items: [
    {
      title: 'Text',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Text,
    },
    {
      title: 'Number',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Number,
    },
    {
      title: 'Select',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Select,
    },
    {
      title: 'MultiSelect',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.MultiSelect,
    },
    {
      title: 'Status',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Status,
    },
    {
      title: 'Date',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Date,
    },
    {
      title: 'Person',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Person,
    },
    {
      title: 'FileAndMedia',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.FileAndMedia,
    },
    {
      title: 'Checkbox',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Checkbox,
    },
    {
      title: 'Url',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Url,
    },
    {
      title: 'Email',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Email,
    },
    {
      title: 'Phone',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Phone,
    },
    {
      title: 'Formula',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Formula,
    },
    {
      title: 'Relation',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Relation,
    },
    {
      title: 'Rollup',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Rollup,
    },
    {
      title: 'CreatedTime',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.CreatedTime,
    },
    {
      title: 'LastEditedBy',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.LastEditedBy,
    },
    {
      title: 'LastEditedTime',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.LastEditedTime,
    },
    {
      title: 'Button',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Button,
    },
    {
      title: 'Id',
      trailingVisual: '⌘C',
      type: ProjectPropertiesTypes.Id,
    },
  ],
};

const ProjectPropertiesComponent: React.FC = () => {
  const [menus, setMenus] = useState<ActionMenuItem[]>([]);
  const [anchorOpen, setAnchorOpen] = useState<boolean>(false);

  const handleAddNewProperty = (type: ActionMenuItem) => {
    setMenus([...menus, type]);
  };

  const propertiesActionMenu = (menu: ActionMenuProps) => (
    <>
      <ActionMenu>
        <ActionMenu.Button
          variant='invisible'
        >
          {menu.buttonTitle}
        </ActionMenu.Button>

        <ActionMenu.Overlay
          width={menu.overlaySize}
        >
          <ActionList>
            {
              menu.items.map((menuItem, index) => (
                <>
                  {menuItem.title && (
                    <ActionList.Item
                      onSelect={() => handleAddNewProperty(menuItem)}
                    >
                      {menuItem.title}
                      <ActionList.TrailingVisual>
                        {menuItem.trailingVisual}
                      </ActionList.TrailingVisual>
                    </ActionList.Item>
                  )}
                  {menuItem.subMenu && propertiesActionMenu(menuItem.subMenu)}
                  {menuItem.divider && <ActionList.Divider />}
                </>
              ))
            }
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>

    </>
  );

  const ChangeTitleAnchorComponent = (
    <Box
      className='change-title-anchor-component-container'
    >
      <Text>
        Change Title
      </Text>
      <Stack
        direction='horizontal'
        align='center'
      >
        <GrabberIcon size={16} />
        <TextInput />
      </Stack>
      <Divider />

      <Stack
        direction='horizontal'
        align='center'
      >
        <Text>Type</Text>
        <TextInput />
      </Stack>

      <Stack
        direction='horizontal'
        align='stretch'
      >
        <ButtonIcon>
          hello
        </ButtonIcon>
      </Stack>

      <Stack
        direction='horizontal'
        align='end'
        justify='end'
      >
        <IconButton
          aria-labelledby='h'
          icon={CrossReferenceIcon}
        />
        <IconButton
          aria-labelledby='h'
          icon={CheckIcon}
        />
      </Stack>

    </Box>
  );

  const renderPropertiesComponent = (menu: ActionMenuItem) => (
    <>
      {menu.type === ProjectPropertiesTypes.Text && (
        <Stack
          direction='horizontal'
          justify='space-between'
        >
          <Button
            variant='invisible'
          >
            <SquareFillIcon
              size={16}
            />
            {menu.title}
          </Button>
          <TextInput
            placeholder='placeholder'
          />
        </Stack>
      )}
      {menu.type === ProjectPropertiesTypes.Number && (
        <Stack
          direction='horizontal'
          justify='space-between'
        >
          <AnchoredOverlay
            open={anchorOpen}
            onOpen={() => setAnchorOpen(true)}
            onClose={() => setAnchorOpen(false)}
            renderAnchor={(props) => (
              <Button
                variant='invisible'
                {...props}
              >
                <SquareFillIcon size={16} />
                Number
              </Button>
            )}
          >
            {ChangeTitleAnchorComponent}
          </AnchoredOverlay>
          <TextInput
            placeholder='Number'
            type='number'
          />
        </Stack>
      )
      }
      {menu.type === ProjectPropertiesTypes.Select && (
        <Stack
          direction='horizontal'
          justify='space-between'
        >
          <Button
            variant='invisible'
          >
            <SquareFillIcon size={16} />
            Select
          </Button>
          <Select>
            <Select.Option value="one">Choice one</Select.Option>
            <Select.Option value="two">Choice two</Select.Option>
            <Select.Option value="three">Choice three</Select.Option>
            <Select.Option value="four">Choice four</Select.Option>
            <Select.Option value="five">Choice five</Select.Option>
            <Select.Option value="six">Choice six</Select.Option>
          </Select>
        </Stack>
      )
      }
      {menu.type === ProjectPropertiesTypes.MultiSelect && (
        <Stack
          direction='horizontal'
          justify='space-between'
        >
          <Button
            variant='invisible'
          >
            <SquareFillIcon size={16} />
            Select
          </Button>
          <SelectPanel
            onFilterChange={() => undefined}
            onSelectedChange={() => undefined}
            selected={[]}
            items={[]}
            open={false}
            onOpenChange={() => undefined}
            placeholderText="Filter Labels"
            showItemDividers={true}
            overlayProps={{
              width: 'small',
              height: 'medium',
            }}
          />
        </Stack>
      )
      }
      {menu.type === ProjectPropertiesTypes.Date && (
        <Stack
          direction='horizontal'
          justify='space-between'
        >
          <Button
            variant='invisible'
          >
            <SquareFillIcon size={16} />
            Date
          </Button>

          <TextInput
            type='date'
          />
        </Stack>
      )}
    </>
  );

  return (
    <Stack>
      <Stack
        align='stretch'
        className='project-properties-container'
      >
        {menus.map((menu) => renderPropertiesComponent(menu))}
      </Stack>
      <Stack
        align='start'
      >
        {propertiesActionMenu(MOCK_ACTION_MENUS)}
      </Stack>
    </Stack>
  );
};


export const ProjectProperties = observer(ProjectPropertiesComponent);

