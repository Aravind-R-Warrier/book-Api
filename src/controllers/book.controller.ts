import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Book, books } from '../models/book.model';
import { parseCSV } from '../utils/csvParser';

export const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json(books);
};

export const getBookById = (req: Request, res: Response): void => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.status(200).json(book);
};


export const createBook = (req: Request, res: Response): void => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const newBook: Book = {
    id: uuidv4(),
    title,
    author,
    publishedYear: Number(publishedYear),
  };

  books.push(newBook);
  res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { title, author, publishedYear } = req.body;

  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  books[bookIndex] = {
    ...books[bookIndex],
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author,
    publishedYear: publishedYear || books[bookIndex].publishedYear,
  };

  res.status(200).json(books[bookIndex]);
};


export const deleteBook = (req: Request, res: Response): void => {
  const { id } = req.params;
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  const deleted = books.splice(bookIndex, 1);
  res.status(200).json({ message: 'Book deleted', book: deleted[0] });
};


export const importBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No CSV file uploaded' });
      return;  // just exit, no return of res object
    }

    const filePath = req.file.path;
    const { validBooks, errors } = await parseCSV(filePath);

    for (const book of validBooks) {
      book.id = uuidv4();
      books.push(book);
    }

    res.status(200).json({
      added: validBooks.length,
      errors,
    });
  } catch (error) {
    next(error);
  }
};