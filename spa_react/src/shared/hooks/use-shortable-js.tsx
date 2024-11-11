import Sortable from "sortablejs";

class SortableJsService {
  create(element: HTMLElement, option?: Sortable.Options) {
    new Sortable(element, option ?? {});
  }
  createFromDataViewElement(element: HTMLElement, option?: Sortable.Options) {
    const tBody = element.getElementsByTagName('tbody')[0];
    new Sortable(tBody, option ?? {});
  }
}

export const useSortable = () => {
  const sortable = new SortableJsService();

  return {
    sortable,
  };
};
