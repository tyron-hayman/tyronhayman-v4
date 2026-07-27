// structure.ts
import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Settings group
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings")
            .items([
              S.listItem().title("Global").child(
                S.document().schemaType("settings").documentId("settings"), // fixed ID = singleton
              ),
            ]),
        ),

      S.divider(),
      // pages group
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home Page")
                .child(
                  S.document().schemaType("homepage").documentId("homepage"),
                ),
              S.listItem()
                .title("Work Page")
                .child(
                  S.document().schemaType("workPage").documentId("workPage"),
                ),
            ]),
        ),

      // Everything else, minus the settings type
      ...S.documentTypeListItems().filter(
        (item) =>
          !["homepage", "settings", "workPage"].includes(
            item.getId() as string,
          ),
      ),
    ]);
