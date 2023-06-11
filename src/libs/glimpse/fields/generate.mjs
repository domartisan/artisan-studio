import { v5 as uuidv5 } from "uuid";
import ACFController from "./TypesController/acf";
import generateCleanStructure from "./clean";

export default function generateFieldGroups({ meta, html }) {
  // Set default values for meta properties
  const {
    page = `randomid-page_${uuidv5(html, uuidv5.DNS)}`,
    source = `${page}.domartisan.com/${page}`,
    type = "ACF",
    template = false,
  } = meta;

  let exportData;
  const ProcessedHTML = generateCleanStructure(html);

  // Use the appropriate controller based on the `type`
  switch (type) {
    case "ACF":
      exportData = ACFController({ meta, html: ProcessedHTML });
      break;
    default:
      exportData = "Unsupported type";
      break;
  }

  return {
    page,
    source,
    type,
    template,
    export: exportData,
  };
}
