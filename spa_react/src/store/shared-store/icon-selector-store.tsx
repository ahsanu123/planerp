import { makeAutoObservable, observable, values } from "mobx";
import * as octicon from '@primer/octicons-react';
import { Icon } from "@primer/octicons-react";

export type OcticonIconKeys = keyof typeof octicon;
export interface ISelectIcon {
  name: OcticonIconKeys;
  content: JSX.Element;
}
export type ISelectIconMap = [OcticonIconKeys, ISelectIcon];

const createDefaultMap = (listKeys: Array<OcticonIconKeys>): ISelectIconMap[] => {
  const convertIconToJsx = (OcticonIcon: Icon) => (
    <OcticonIcon />
  );

  const renderListOcticonIcon = (list: Array<OcticonIconKeys>) => (
    list.map<ISelectIcon>((key) => ({
      name: key,
      content: convertIconToJsx(octicon[key])
    }))
  );

  return renderListOcticonIcon(listKeys).map<ISelectIconMap>((content) => [content.name, content]);
};

export class IconSelectorStore {

  constructor() {
    makeAutoObservable(this);
  }

  @observable
  octiconIconKeys = Object.keys(octicon) as Array<OcticonIconKeys>;

  @observable
  octiconIconMap: Map<OcticonIconKeys, ISelectIcon> = new Map(createDefaultMap(this.octiconIconKeys));

}
