import { type SchemaTypeDefinition } from "sanity";
import homepage from "../schema/homepage";
import settings from "../schema/settings";
import workPage from "../schema/workPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, settings, workPage],
};
