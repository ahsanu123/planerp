import { Icon } from "@primer/octicons-react";
import { LoggerModel } from "./generated/logger-model";

export interface TimelineModel extends Partial<LoggerModel> {
  icon: Icon;
}
