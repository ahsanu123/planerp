import { action, makeAutoObservable, observable } from "mobx";
import { ComponentPriceHistory } from "../../api/auto-generated";
import { Component } from "../../model/generated/component";

const MOCK_USED_COMPONENT: Array<Component> = [
  {
    name: 'Omron Electronics G6K-2F-Y DC12',
    type: '',
    imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20230109_Omron-Electronics-G6K-2F-Y-DC12_C397194_front.jpg',
    category: "MCU",
    description: 'SMD,6.5x10mm Signal Relays ROHS',
    price: 0.2989,
    buyDate: new Date(),
    capital: 0.2989,
    supplier: "LCSC.COM",
    supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
    isAssembly: false,
    storageId: 0,
    id: 1,
    stock: 5,
    partNumber: "",
    apiUrl: 'https://wmsc.lcsc.com/ftps/wm/product/detail?productCode=C397194'
  },
  {
    name: 'DORABO DB2EK-2.54-4P-GN-S',
    type: '',
    imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20230107_DORABO-DB2EK-2-54-4P-GN-S_C2927485_front.jpg',
    category: "MCU",
    description: 'SMD,6.5x10mm Signal Relays ROHS',
    price: 0.2989,
    buyDate: new Date(),
    capital: 0.2989,
    supplier: "LCSC.COM",
    supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
    isAssembly: false,
    storageId: 0,
    id: 2,
    stock: 5,
    partNumber: "",
    apiUrl: 'https://wmsc.lcsc.com/ftps/wm/product/detail?productCode=C2927485'
  },
  {
    name: 'PANASONIC 20TQC100MYF',
    type: '',
    imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20240307_cjiang--Changjiang-Microelectronics-Tech-FXL0630-3R3-M_C167219_front.jpg',
    category: "MCU",
    description: '100uF 20V 55mΩ@100kHz ±20% Tantalum Capacitors ROHS',
    price: 0.2989,
    buyDate: new Date(),
    capital: 0.2989,
    supplier: "LCSC.COM",
    supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
    isAssembly: false,
    storageId: 0,
    id: 0,
    stock: 5,
    partNumber: "",
    apiUrl: 'https://wmsc.lcsc.com/ftps/wm/product/detail?productCode=C139578'
  },
  {
    name: 'NXP Semicon LPC1788FBD208K',
    type: '',
    imageUrl: 'https://assets.lcsc.com/images/lcsc/900x900/20230202_NXP-Semicon-LPC1788FBD208K_C691535_front.jpg',
    category: "MCU",
    description: 'SMD,6.5x10mm Signal Relays ROHS',
    price: 0.2989,
    buyDate: new Date(),
    capital: 0.2989,
    supplier: "LCSC.COM",
    supplierLink: "https://lcsc.com/product-detail/Microcontrollers-MCU-MPU-SOC_STMicroelectronics-STM8S003F3P6TR_C52717.html",
    isAssembly: false,
    storageId: 0,
    id: 0,
    stock: 5,
    partNumber: "",
    apiUrl: 'https://wmsc.lcsc.com/ftps/wm/product/detail?productCode=C691535'
  },
];

export class ProjectHistoryPageStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable
  ProjectComponentList: Component[] = MOCK_USED_COMPONENT;

  @observable
  SelectedApiPrice?: ComponentPriceHistory = undefined;

  @action
  SetSelectedApiPrice(apiPrice: ComponentPriceHistory) {
    this.SelectedApiPrice = apiPrice;
  }

}
