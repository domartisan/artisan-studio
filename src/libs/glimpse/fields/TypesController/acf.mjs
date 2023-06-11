import * as cheerio from "cheerio";

export default function ACFController({ meta, html }) {
  const $ = cheerio.load(html);
  const { page, template } = meta;
  const sections = $("section");
  const fieldGroups = [];

  sections.each((i, section) => {
    let sectionId = $(section).attr("id");
    // If no ID, assign one with format "section_{index}"
    if (!sectionId) {
      sectionId = `section_${i + 1}`;
    }

    const fieldGroup = {
      key: sectionId,
      title: `group_${page}`,
      fields: [],
      location: [
        [
          {
            param: "post_type",
            operator: "==",
            value: "post",
          },
        ],
      ],
    };

    const sectionHtml = $(section).html();
    const fieldLabelMapping = {};

    ["h1", "img", "p"].forEach((tag, tagIndex) => {
      const el = $(section).find(tag).eq(tagIndex);
      if (el.length > 0) {
        const field = {
          key: `field_${tag}_${tagIndex + 1}`,
          label: `${sectionId}_${tag}_${tagIndex + 1}`,
          name: tag === "img" ? el.attr("src") : el.text(),
          type: tag === "img" ? "image" : "text",
        };

        fieldGroup.fields.push(field);
        fieldLabelMapping[field.name] = field.label;
      }
    });

    if (template) {
      let templateHtml = sectionHtml.replace(
        /\{\{(.*?)\}\}/g,
        (match, p1) => `[acf field="${p1.trim()}"]`
      );

      // Replace variables in the template with the corresponding labels
      for (const variableName in fieldLabelMapping) {
        const label = fieldLabelMapping[variableName];
        const regex = new RegExp(
          `\\[acf field="${variableName.trim()}"\\]`,
          "g"
        );
        templateHtml = templateHtml.replace(regex, `[acf field="${label}"]`);
      }

      fieldGroup.template = {
        key: `field_template`,
        label: `template_${sectionId}`,
        name: templateHtml,
        type: "wysiwyg",
      };

      fieldGroup.preview = {
        key: `field_preview`,
        label: `preview_${sectionId}`,
        name: sectionHtml,
        type: "wysiwyg",
      };
    }

    fieldGroups.push(fieldGroup);
  });

  return fieldGroups;
}
