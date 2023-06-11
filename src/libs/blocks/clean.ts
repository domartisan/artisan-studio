import * as cheerio from 'cheerio';

export default function CategorizeAndSanitize(htmlDocument: string): string {
  const $ = cheerio.load(htmlDocument, {
    decodeEntities: false,
    xmlMode: true,
  });

  // Iterate through all elements in the document
  $('*').each(function () {
    // For each element, check if it has each of the attributes and update them if so
    const cmsBlockField = $(this).attr('cms-block-field');
    const cmsBlock = $(this).attr('cms-block');
    const cmsBlockParent = $(this).attr('cms-block-parent');

    if (cmsBlockField) {
      const sanitized = cmsBlockField.toLowerCase().replace(/[^a-z0-9_]/g, '_');
      $(this).attr('cms-block-field', sanitized);
    }

    if (cmsBlock) {
      const sanitized = cmsBlock.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      $(this).attr('cms-block', sanitized);

      // Adding new attributes to the element with a cms-block attribute
      $(this).attr({
        'cms-block-category': 'custom',
        'cms-block-category-custom': 'legacy',
        'cms-block-category-custom-register': 'true',
        'cms-block-category-custom-register-name': 'Legacy Blocks',
        'cms-block-category-custom-register-icon':
          '<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot;><path d=&quot;M3 14L7 16.5L10 13L13 17L15 14.5L18 15L15 12L13 14.5L10 9.5L6.5 13.25L3 10V2.9918C3 2.45531 3.44694 2 3.99826 2H14V8C14 8.55228 14.4477 9 15 9H21V20.9925C21 21.5511 20.5552 22 20.0066 22H3.9934C3.44495 22 3 21.556 3 21.0082V14ZM21 7H16V2.00318L21 7Z&quot;></path></svg>',
      });
    }

    if (cmsBlockParent) {
      const sanitized = cmsBlockParent
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-');
      $(this).attr('cms-block-parent', sanitized);
    }
  });

  return $.html();
}
