import {
  ConvertBlockParams,
  ConvertBlocksSchema,
  WebcParams,
  WebcSchema,
} from './block.types';
import { sanitizeAttribute, generateFieldName } from './utils';
import CategorizeAndSanitize from './clean';
import * as cheerio from 'cheerio';
import {
  processInformerSections,
  processContainerFluids,
  processImgElements,
  processTextNodes,
  processLinkNodes,
} from './nodes';

export default function ConvertBlocks({
  htmlDocument,
  pageName,
  route,
}: ConvertBlockParams) {
  // Validate the handoff object.
  const validConvertBlocks = ConvertBlocksSchema.parse({
    htmlDocument,
    pageName,
    route,
  });

  const origin = cheerio.load(validConvertBlocks.htmlDocument);

  const originScripts = origin('body script');

  // Load the template into a new Cheerio instance
  const $ = cheerio.load(validConvertBlocks.htmlDocument, {
    decodeEntities: false,
    xmlMode: true,
  });

  // Process various nodes
  processInformerSections($, validConvertBlocks);
  processImgElements($);
  processTextNodes($);
  processLinkNodes($);

  const mHead = $('html').find('head'); // Page head
  const mScripts = $('body').find('script'); // Page scripts
  const mHeader = $('body').find('header'); // Page header
  const mFooter = $('body').find('#wrapped__footer'); // Page footer
  const informer = $('body').find('.informer-sections'); // Page content

  // Component Payload Template
  const webc: WebcParams = {
    head: mHead.html() || '',
    scripts: mScripts.html() || '',
    header: mHeader.html() || '',
    footer: mFooter.html() || '',
    informer: informer.html() || '',
  };

  // Validate the webc object.
  const parsedWebc = WebcSchema.parse(webc);

  // Apply CategorizeAndSanitize on each part of the parsedWebc
  parsedWebc.head = CategorizeAndSanitize(parsedWebc.head);
  parsedWebc.scripts = CategorizeAndSanitize(parsedWebc.scripts);
  parsedWebc.header = CategorizeAndSanitize(parsedWebc.header);
  parsedWebc.footer = CategorizeAndSanitize(parsedWebc.footer);
  parsedWebc.informer = CategorizeAndSanitize(parsedWebc.informer);

  $('body').find('script').remove();
  const body = CategorizeAndSanitize($('body').html() || '');

  // add origin scripts
  originScripts.each((i, el) => {
    const script = $(el).html();
    if (script) {
      $('body').append(`<script id="__NEXT_DATA__">${script}</script>`);
    }
  });

  const template: string = `
   ${body}
  `;
  return template;
}
