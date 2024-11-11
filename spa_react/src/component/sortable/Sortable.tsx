import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useSortable } from "../../shared/hooks/use-shortable-js";
import Sortable from "sortablejs";

interface SortableComponentProps {
  group: string;
  children: React.ReactNode;
  sortableOption?: Sortable.Options;
  childrenIsDatatable?: boolean;
}

const SortableComponent: React.FC<SortableComponentProps> = (props) => {

  const {
    group,
    children,
    sortableOption,
    childrenIsDatatable = false
  } = props;

  const {
    sortable
  } = useSortable();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const option: Sortable.Options = {
      group,
      ...sortableOption
    };

    if (childrenIsDatatable)
      sortable.createFromDataViewElement(containerRef.current, option);
    if (!childrenIsDatatable)
      sortable.create(containerRef.current, { ...option });

  }, [containerRef]);

  return (
    <div
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export const SortableContainer = observer(SortableComponent);
