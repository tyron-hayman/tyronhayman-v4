import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "homepage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroText",
      title: "Hero Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroContent",
      title: "Hero Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: "techUsed",
      title: "Tech Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "workHeading",
      title: "Work Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "workContent",
      title: "Work Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: "workItems",
      title: "Work Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "text",
            }),
            defineField({
              name: "year",
              title: "Year",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
            defineField({
              name: "tech",
              title: "Tech Used",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "aboutEyebrow",
      title: "About Eyebrow",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aboutTitle",
      title: "About Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aboutContent",
      title: "About Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: "aboutStats",
      title: "About Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "valuePlus",
              title: "Show Plus",
              type: "boolean",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "number",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "text",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "footerEyebrow",
      title: "Footer Eyebrow",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footerLinkText",
      title: "Footer Link Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
