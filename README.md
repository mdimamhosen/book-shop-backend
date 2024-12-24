# Project: Book and Order Management API

## Overview

This project is a RESTful API for managing books and orders, built using **TypeScript**, **Node.js**, and **Mongoose**. It follows a modular folder structure for scalability and maintainability. The application also includes robust data validation with **Zod** and **Joi**, along with a generic error response system.

---

## Features

### Book Management

- **POST /api/product**: Add a new book.
- **GET /api/product**: Retrieve all books.
- **GET /api/product/:id**: Retrieve a specific book by ID.
- **PUT /api/product/:id**: Update book details by ID.
- **DELETE /api/product/:id**: Delete a book by ID.

### Order Management

- **POST /api/order**: Place a new order.
- **GET /api/order**: Retrieve all orders.
- **GET /api/order/:id**: Retrieve a specific order by ID.
- **DELETE /api/order/:id**: Cancel an order by ID.

---

## Folder Structure

The project structure is organized as follows:

```

project-root
├── dist/ # Compiled JavaScript files
├── src/ # Source files
│ ├── app.ts # Application declaration
│ ├── server.ts # Server connection
│ ├── app/ # Application-specific modules
│ │ ├── config/ # Configuration files
│ │ │ └── index.ts # Server configurations
│ │ ├── models/ # Data models
│ │ │ ├── book/ # Book module
│ │ │ │ ├── book.interface.ts
│ │ │ │ ├── book.model.ts
│ │ │ │ ├── book.controller.ts
│ │ │ │ ├── book.routes.ts
│ │ │ │ └── book.service.ts
│ │ │ ├── order/ # Order module
│ │ │ │ ├── order.interface.ts
│ │ │ │ ├── order.model.ts
│ │ │ │ ├── order.controller.ts
│ │ │ │ ├── order.routes.ts
│ │ │ │ └── order.service.ts
│ ├── utils/ # Utility functions
│ │ └── errorResponse.ts # Generic error response declarations
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── .prettierrc.json # Prettier configuration
├── eslint.config.mjs # ESLint configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Project metadata and dependencies
├── README.md # Project documentation

```

---

## Workflow

### API Request Flow

1. **Route**: Receives the request and forwards it to the appropriate controller.
2. **Controller**: Handles request processing and invokes the relevant service.
3. **Service**: Contains business logic and interacts with models.
4. **Model**: Handles database queries and data schema definitions.

### Example Flow

**GET /api/product/:id**

1. Route -> Controller -> Service -> Model -> Response

---

## Endpoints

### Product Routes (Books)

1. **Create a Book**
   `POST /api/products`

2. **Get All Books**
   `GET /api/products`

   - **Response**: A list of all books with details like name, author, price, category, etc.
   - **Query**: You can filter books by category, title, any word form the description or author by using a query parameter:
     Example: `/api/products?searchTerm=category`
     - `searchTerm` can be any of the following:
       - `category` (e.g., "fiction", "science")
       - `title` (e.g., "The Great Gatsby")
       - `author name` (e.g., "J.K. Rowling")
       - `any word from description` (e.g., "Story of a magician")
     - The query will return a list of books matching the provided search term.

3. **Get a Book**
   `GET /api/products/:productId`

4. **Update a Book**
   `PUT /api/products/:productId`

5. **Delete a Book**
   `DELETE /api/products/:productId`

### Order Routes

1. **Place an Order**
   `POST /api/orders`

2. **Get All Orders**
   `GET /api/orders`

3. **Get an Order**
   `GET /api/orders/:orderId`

4. **Delete an Order**
   `DELETE /api/orders/:orderId`

### Revenue Calculation

1. **Calculate Revenue**
   `GET /api/orders/revenue`

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <https://github.com/mdimamhosen/book-shop-backend.git>
   ```

````

2. Navigate to the project directory:

   ```bash
   cd book-shop-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file for environment variables (example):

   ```env
   PORT=5000
   DB_URI=<your_mongo_db_connection_string>
   ```

5. Start the development server:

   ```bash
   npm run start:dev
   ```

6. Build the project:

   ```bash
   npm run build
   ```

---

## Scripts

- **Start Development**: `npm run start:dev`
- **Build Project**: `npm run build`
- **Lint**: `npm run lint`
- **Start Server**: `npm start:prod`

---

## Technologies Used

- **Node.js**
- **TypeScript**
- **Mongoose**
- **Zod** and **Joi** for data validation
- **Express.js** for routing
- **ESLint** and **Prettier** for code formatting and linting

---

## Contact

For any questions or support, feel free to contact me via [mdimam.cse9.bu@gmail.com].


````
