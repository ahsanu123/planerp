/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { BaseModel } from "./base-model";

export interface Project extends BaseModel {
    name: string;
    createdDate: Date;
    deadLineDate: Date;
    lastUpdatedDate: Date;
    finishedDate: Date;
    sellPrice: number;
    capital: number;
    fail: boolean;
    finish: boolean;
    profitInPersen: number;
    description: string;
}
