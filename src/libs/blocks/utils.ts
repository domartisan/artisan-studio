import { z } from 'zod';

export function extractFirstContainerName(str: string): string {
  // Split the input string by spaces to separate multiple entries
  const parts = str.split(' ');

  // Check if parts[0] has a "."
  if (parts[0].includes('.')) {
    // Further split the first part if a "." exists
    const firstSplit = parts[0].split('.');
    // Check if firstSplit[1] has a "_"
    if (firstSplit[1].includes('_')) {
      // Further split the firstSplit[1] part if a "_" exists
      const secondSplit = firstSplit[1].split('_');
      return secondSplit[0];
    } else {
      // Return the firstSplit[1] as is
      return firstSplit[1];
    }
  } else {
    // Return the parts[0] as is
    return parts[0];
  }
}

export function sanitizeAttribute(
  attribute: string,
  replaceChar: string,
): string {
  // Define a regular expression for invalid characters
  const invalidChars =
    replaceChar === '-' ? /[^a-zA-Z0-9-]/g : /[^a-zA-Z0-9_]/g;

  // Replace invalid characters
  return attribute.replace(invalidChars, replaceChar);
}

export function generateFieldName(
  parentBlock: string | undefined,
  tagName: string,
  index: number,
) {
  return `${tagName}_${index}`;
}
