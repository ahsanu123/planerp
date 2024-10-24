/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { BaseModel } from "./base-model";

export interface Component extends BaseModel {
    name: string;
    imageUrl: string;
    type: string;
    category: string;
    description: string;
    price: number;
    capital: number;
    supplier: string;
    supplierLink: string;
    isAssembly: boolean;
    stock: number;
    buyDate: Date;
    storageId: number;
}
