import { AnchoredOverlay, Button, Stack, TextInput, Tooltip } from "@primer/react";
import { observer } from "mobx-react-lite";
import './IconSelector.scss';
import { useMemo, useState } from "react";
import { ISelectIcon, OcticonIconKeys } from "../../store/shared-store/icon-selector-store";
import { useMainStore } from "../../store/useMainStore";
import { SearchIcon, SquareIcon } from "@primer/octicons-react";

const IconSelectorComponent: React.FC = () => {
  const {
    iconSelectorStore,
  } = useMainStore();

  const onFilterChanged = (text: string) => iconSelectorStore.octiconIconKeys.filter((value) => value.toLowerCase().includes(text));

  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [selectedIcon, setsSelectedIcon] = useState<ISelectIcon | undefined>({ name: 'SquareIcon', content: <SquareIcon /> });
  const [filterText, setFilterText] = useState<string>('');
  const listIconName = useMemo<OcticonIconKeys[]>(() => onFilterChanged(filterText), []);

  const overlayContent = (
    <Stack
      className='icon-selector-container'
      style={{
        padding: '20px 10px',
      }}
    >
      <TextInput
        className='list-icon-search-bar'
        placeholder='Filter'
        leadingVisual={<SearchIcon size={16} />}
        onChange={(ev) => setFilterText(ev.currentTarget.value)}
      />

      <Stack
        className='list-icon-container'
        style={{
          padding: '50px 20px',
        }}
      >
        <Stack
          wrap='wrap'
          direction='horizontal'
          align='start'
          justify='start'
        >
          {listIconName && (
            listIconName.map((name) => (
              <Tooltip
                text={name}
              >
                <Button
                  variant='invisible'
                  onClick={() => setsSelectedIcon(iconSelectorStore.octiconIconMap.get(name))}
                >
                  {iconSelectorStore.octiconIconMap.get(name)?.content}
                </Button>
              </Tooltip>
            ))
          )}
        </Stack>
      </Stack>
    </Stack>
  );

  const anchoredOverlayButton = (props: React.HTMLAttributes<HTMLElement>) => (
    <Tooltip
      text={selectedIcon?.name}
    >
      <Button
        size='small'
        variant='invisible'
        {...props}
      >
        {selectedIcon?.content}
      </Button>
    </Tooltip>
  );

  return (
    <AnchoredOverlay
      className='select-icon-anchor-overlay'
      open={isOverlayOpen}
      onOpen={() => setIsOverlayOpen(true)}
      onClose={() => setIsOverlayOpen(false)}
      renderAnchor={anchoredOverlayButton}
    >
      {overlayContent}
    </AnchoredOverlay>
  );
};

export const IconSelector = observer(IconSelectorComponent);
