
Book Management API
This is a simple Express.js API for managing books, including:

Create, read, update, delete (CRUD) books

Import books in bulk from CSV files

Uses Multer middleware for file upload

Features
Get all books

Get book by ID

Create a new book

Update a book by ID

Delete a book by ID

Import books from a CSV file upload


| Method | Endpoint            | Description                | Request Body / Params                              |
| ------ | ------------------- | -------------------------- | -------------------------------------------------- |
| GET    | `/api/books`        | Get all books              | None                                               |
| GET    | `/api/books/:id`    | Get a book by ID           | `id` (URL param)                                   |
| POST   | `/api/books`        | Create a new book          | `{ title, author, publishedYear }`                 |
| PUT    | `/api/books/:id`    | Update a book by ID        | `id` (URL param), updated fields in body           |
| DELETE | `/api/books/:id`    | Delete a book by ID        | `id` (URL param)                                   |
| POST   | `/api/books/import` | Import books from CSV file | Multipart form-data with `file` key containing CSV |

1st=clone the repository
2nd=npm install
3rd=npm run start
4rth=remember to make a .env file inside add a preferred-PORT like below
PORT=5000
# or if you have nodemon for development
npm run dev
