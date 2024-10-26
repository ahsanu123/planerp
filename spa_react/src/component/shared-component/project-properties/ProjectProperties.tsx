import { observer } from 'mobx-react-lite';
import './ProjectProperties.scss';
import { ActionList, ActionMenu, Checkbox, Stack, TextInput } from '@primer/react';

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
  buttonTitle: 'created date',
  overlaySize: 'small',
  items: [
    {
      title: 'rename',
      trailingVisual: '⌘C',
    },
    {
      title: 'rename',
      trailingVisual: '⌘C',
    },
    {
      title: 'rename',
      trailingVisual: '⌘C',
    },
    {
      subMenu: {
        buttonTitle: 'created date',
        overlaySize: 'small',
        items: [
          {
            title: 'rename',
            trailingVisual: '⌘C',
            subMenu: {
              buttonTitle: 'created date',
              overlaySize: 'small',
              items: [
                {
                  title: 'rename',
                  trailingVisual: '⌘C',
                },
                {
                  title: 'rename',
                  trailingVisual: '⌘C',
                },
                {
                  title: 'rename',
                  trailingVisual: '⌘C',
                  subMenu: {
                    buttonTitle: 'created date',
                    overlaySize: 'small',
                    items: [
                      {
                        title: 'rename',
                        trailingVisual: '⌘C',
                      },
                      {
                        title: 'rename',
                        trailingVisual: '⌘C',
                      },
                      {
                        title: 'rename',
                        trailingVisual: '⌘C',
                      },
                    ]
                  }
                },
              ]
            }
          },
          {
            title: 'rename',
            trailingVisual: '⌘C',
          },
          {
            title: 'rename',
            trailingVisual: '⌘C',
          },
        ]
      }
    },
    {
      title: 'rename',
      trailingVisual: '⌘C',
      divider: true,
    },
    {
      title: 'rename',
      trailingVisual: '⌘C',
    },
  ],
}
  ;

const ProjectPropertiesComponent: React.FC = () => {
  const propertiesActionMenu = (menu: ActionMenuProps) => (
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
            menu.items.map((menuItem) => (
              <>
                {menuItem.title && (
                  <ActionList.Item
                    onSelect={menuItem.onSelect}
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
  );

  const renderPropertiesComponent = (
    <TextInput
      placeholder='placeholder'
    />
  );

  return (
    <Stack
      align='stretch'
      className='project-properties-container'
      direction='horizontal'
    >
      {propertiesActionMenu(MOCK_ACTION_MENUS)}
      {renderPropertiesComponent}
    </Stack>
  );
};


export const ProjectProperties = observer(ProjectPropertiesComponent);

