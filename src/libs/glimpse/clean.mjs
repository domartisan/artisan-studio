import * as cheerio from 'cheerio';

export default function generateCleanStructure(html) {
  const $ = cheerio.load(html);
  // Selectors for divs that needs to be converted to main
  const elementSelectors = {
    main: ['__next', '__nuxt', 'main', 'main-content', 'content'],
    section: ['section', 'part', 'subsection'],
    header: ['header', 'top', 'header-container'],
    nav: ['nav', 'navbar', 'navigation', 'menu'],
    footer: ['footer', 'foot', 'bottom'],
    div: ['container', 'block', 'wrapper'],
    aside: ['aside', 'sidebar', 'sidenav', 'verticalnav'],
  };

  for (const key in elementSelectors) {
    elementSelectors[key].forEach(keyword => {
      $(`div[id*="${keyword}"], div[class*="${keyword}"]`).each(function () {
        if (this.tagName !== key) {
          const attributes = this.attribs;
          const innerHTML = $(this).html();
          $(this).replaceWith(
            `<${key} ${Object.entries(attributes)
              .map(([k, v]) => `${k}="${v}"`)
              .join(' ')}>${innerHTML}</${key}>`,
          );
        }
      });
    });
  }
  return $.html();
}
