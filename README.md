# Product Catalog

A modern single-page React application built as a solution for the Abysalto Academy entrance task.

The application allows users to browse products, search and filter them, view detailed product information, and access protected routes after authentication using the DummyJSON API.

---

## Live Demo

[View Live Demo](https://solution-josip-celic.vercel.app)

---

## Features

- Responsive product catalog
- Product details page
- Product search with 300ms debounce
- Category and price filtering
- Client-side pagination after fetching the full product list to ensure search and filters are applied across all products
- Search, filters and pagination synchronized with URL query parameters
- Loading, empty and error states
- Authentication using the DummyJSON API
- Protected Favorites page
- Dark mode
- Scroll position restoration after returning from product details

---

## Tech Stack

- React 19
- TypeScript 5
- Vite
- React Router 7
- TanStack Query
- CSS Modules
- Vitest
- React Testing Library

---

## Installation

Clone the repository:

```bash
git clone https://github.com/jcelic/solution-josip_celic
cd solution-josip_celic
```

Install dependencies:

```bash
npm install
```

---

## Available Scripts

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run unit and component tests:

```bash
npm test
```

Run the linter:

```bash
npm run lint
```

---

## Authentication

Authentication is implemented using the DummyJSON authentication endpoint.

Demo credentials:

**Username**

```text
emilys
```

**Password**

```text
emilyspass
```

---

## Project Structure

```text
src
├── api
├── components
├── context
├── hooks
├── layouts
├── pages
├── test
├── types
├── utils
├── App.tsx
├── main.tsx
└── index.css
```

---

## Testing

The project uses **Vitest** together with **React Testing Library**.

Implemented tests include:

- ProductCard
- Pagination
- ProtectedRoute

Run the test suite with:

```bash
npm test
```

---

## AI Usage

ChatGPT was used throughout the development process, primarily for concepts and technologies I had little or no prior experience with.

It was mainly used to:

- explain certain TypeScript concepts and typing patterns
- explain and assist with writing unit and component tests using Vitest and React Testing Library
- discuss the implementation of URL-synchronized search, filtering and pagination using query parameters instead of keeping that state only in React
- assist with the styling of some UI components (e.g. search input and skeleton loaders) to speed up the development process
- assist with organizing CSS variables and adapting them for the light/dark theme
- review the final code and suggest improvements to readability, structure and overall code quality
- assist with writing and structuring the project README

Whenever possible, I asked for explanations, hints and guidance instead of complete solutions in order to better understand the implementation and learn the underlying concepts.

All AI-generated suggestions were carefully reviewed, adapted where necessary, and manually tested before being included in the project.
