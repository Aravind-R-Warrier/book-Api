import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Book } from '../models/book.model';

interface ParsedResult {
  validBooks: Book[];
  errors: { line: number; error: string }[];
}

export const parseCSV = async (filePath: string): Promise<ParsedResult> => {
  const validBooks: Book[] = [];
  const errors: { line: number; error: string }[] = [];

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lineNumber = 0;

  for await (const line of rl) {
    lineNumber++;
    const [title, author, publishedYearStr] = line.split(',').map(s => s.trim());

    if (!title || !author || !publishedYearStr) {
      errors.push({ line: lineNumber, error: 'Missing required fields' });
      continue;
    }

    const publishedYear = Number(publishedYearStr);
    if (isNaN(publishedYear) || publishedYear < 0) {
      errors.push({ line: lineNumber, error: 'Invalid published year' });
      continue;
    }

    validBooks.push({
      id: '', // Will be added in controller
      title,
      author,
      publishedYear,
    });
  }

  // Delete temp file after parsing
  fs.unlinkSync(path.resolve(filePath));

  return { validBooks, errors };
};
