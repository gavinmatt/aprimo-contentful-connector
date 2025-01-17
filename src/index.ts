import { DialogExtensionSDK } from "@contentful/app-sdk";
import { ParameterDefinition, setup } from "@contentful/dam-app-base";
import { KeyValueMap } from "contentful-management";
import logo from "./logo.png";
import "./index.css";

import {
  renderDialog as dialogRenderDialog,
  openDialog as dialogOpenDialog,
} from "./dialog";
import {
  renderDialog as popupRenderDialog,
  openDialog as popupOpenDialog,
} from "./popup";

import { makeThumbnail } from "./util";

const popup = {
  renderDialog: popupRenderDialog,
  openDialog: popupOpenDialog,
};

const dialog = {
  renderDialog: dialogRenderDialog,
  openDialog: dialogOpenDialog,
};

// const appTypeParameter = {
//   id: "type",
//   type: "List",
//   name: "Integration Type (testing)",
//   description:
//     "Choose 'popup' if you cannot log in with an iframe. Otherwise choose 'dialog'.",
//   value: "dialog,popup",
//   default: "dialog",
//   required: true,
// };

setup({
  cta: "Browse Aprimo",
  name: "Aprimo",
  logo,
  color: "#005F7F",
  description:
    "The Aprimo App allows editors to select media from the Aprimo DAM.",
  parameterDefinitions: [
    {
      id: "aprimoTenantUrl",
      type: "Symbol",
      name: "Arimo URL",
      description:
        "Enter the URL of your Aprimo environment (e.g. https://mycompany.dam.aprimo.com)",
      required: true,
    },
  ],
  validateParameters,
  makeThumbnail,
  renderDialog(sdk) {
    return chooseAppType(sdk.parameters.installation).renderDialog(sdk);
  },
  openDialog(sdk, _, config) {
    return chooseAppType(sdk.parameters.installation).openDialog(
      sdk as unknown as DialogExtensionSDK,
      config
    );
  },
  isDisabled: () => false,
});

function validateParameters({ aprimoTenantUrl }: Record<string, any>) {
  if (!aprimoTenantUrl) {
    return "Please provide the URL to your Aprimo environment.";
  }

  return null;
}

function chooseAppType({ type }: KeyValueMap) {
  return popup;
}
