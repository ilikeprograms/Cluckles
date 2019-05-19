import { v4 as uuid } from "uuid";

import { IVariable, VariableTypes } from "../variables.interface";
import { BootstrapComponentNamesEnum } from "./bootstrap-component-names.enum";

export const bootstrapVariables: Array<IVariable<VariableTypes>> = [
  {
    type: VariableTypes.size,
    value: ".75",
    unit: "rem",
    variable: "$alert-padding-y",
    label: "Padding Y",
    component: BootstrapComponentNamesEnum.Alert
  },
  {
    type: VariableTypes.size,
    value: "1.25",
    unit: "rem",
    variable: "$alert-padding-x",
    label: "Padding X",
    component: BootstrapComponentNamesEnum.Alert
  },
  {
    type: VariableTypes.size,
    value: "1",
    unit: "rem",
    variable: "$alert-margin-bottom",
    label: "Margin bottom",
    component: BootstrapComponentNamesEnum.Alert
  },
  {
    type: VariableTypes.size,
    value: "1",
    unit: "rem",
    variable: "$alert-margin-bottom",
    label: "Margin bottom",
    component: BootstrapComponentNamesEnum.Alert
  },
  {
    type: VariableTypes.size,
    value: "1",
    unit: "px",
    variable: "$alert-border-width",
    label: "Border width",
    component: BootstrapComponentNamesEnum.Alert
  },
  {
    type: VariableTypes.size,
    value: ".25",
    unit: "rem",
    variable: "$alert-border-radius",
    label: "Border radius",
    component: BootstrapComponentNamesEnum.Alert
  },
  {
    type: VariableTypes.fontweight,
    value: "700",
    variable: "$alert-link-font-weight",
    label: "Font weight",
    component: BootstrapComponentNamesEnum.Alert
  },
  {
    type: VariableTypes.fontweight,
    value: "700",
    variable: "$close-font-size",
    label: "Close icon font weight",
    component: BootstrapComponentNamesEnum.Alert
  },
  {
    type: VariableTypes.size,
    value: "2",
    unit: "rem",
    variable: "$jumbotron-padding",
    label: "Padding",
    component: BootstrapComponentNamesEnum.Jumbotron
  },
  {
    type: VariableTypes.color,
    value: "#E9ECEF",
    variable: "$jumbotron-bg",
    label: "Background color",
    component: BootstrapComponentNamesEnum.Jumbotron
  },
  {
    type: VariableTypes.color,
    value: "#E9ECEF",
    variable: "$card-bg",
    label: "Background color",
    component: BootstrapComponentNamesEnum.Card
  },
  {
    type: VariableTypes.color,
    value: "#E9ECEF",
    variable: "$progress-bg",
    label: "Background color",
    component: BootstrapComponentNamesEnum.Progress
  }
].map(
  (entity: Partial<IVariable<VariableTypes>>): IVariable<VariableTypes> => {
    entity.id = uuid();

    return entity as IVariable<VariableTypes>;
  }
);
