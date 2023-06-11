import * as cheerio from 'cheerio';
import ConvertBlocks from './ConvertBlocks';
import { z } from 'zod';

export default async function SyncBlocks(url: string, validCleanPath: string) {
  // Define handoff schema
  const ConvertBlocksSchema = z.object({
    htmlDocument: z.string(),
    pageName: z.string(),
    route: z.string(),
  });

  // Fetch the HTML content from the URL
  const response = await fetch(url);
  const body = await response.text();

  // Use cheerio to parse the HTML and create a jQuery-like interface to it
  const $ = cheerio.load(body);
  const mbody = $('html').html();

  // validate the handoff object
  const validConvertBlocks = ConvertBlocksSchema.parse({
    htmlDocument: mbody,
    pageName: validCleanPath,
    route: validCleanPath, // TODO: this should be the route
  });

  // Convert the parsed HTML blocks using the ConvertBlocks script
  const blocks = await ConvertBlocks(validConvertBlocks);

  return blocks;
}
