import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteSubTitle",
      title: "Site Subtitle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Desc. ( SEO )",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "availabilityText",
      title: "Availability",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteEmail",
      title: "Site Email",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "socials",
      title: "Socials",
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
              name: "url",
              title: "Url",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "contactTextEyebrow",
      title: "Footer Text - Eyebrow",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactText",
      title: "Footer Text - Contact",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
