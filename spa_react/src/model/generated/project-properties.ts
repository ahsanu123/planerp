/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { BaseModel } from "./base-model";
import { ProjectPropertiesType } from "./project-properties-type";

export interface ProjectProperties extends BaseModel {
    name: string;
    propertiesType: ProjectPropertiesType;
    value: string;
}
