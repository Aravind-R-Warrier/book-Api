import express from 'express';
import { upload } from '../middlewares/upload.middleware';
import { createBook, deleteBook, getAllBooks, getBookById, importBooks, updateBook } from '../controllers/book.controller';

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.post('/books/import', upload.single('file'), importBooks);

export default router;
