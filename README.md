# Bank App

A modern banking application built with Next.js, React, and PostgreSQL.
## Demo

![Demo of Bank App](demo-bank-app-1.gif)

## Tech Stack

- **Frontend**: Next.js 15, React 19, Material-UI 7
- **Backend**: Node.js with Sequelize ORM
- **Database**: PostgreSQL
- **Testing**: Jest
- **AWS Integration**: AWS Secrets Manager

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- PostgreSQL

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables (create a `.env` file based on `.env.example`)

4. Set up the database:
   ```bash
   npm run build:db
   npm run migrate
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run test` - Run all tests
- `npm run test:jsdom` - Run frontend tests
- `npm run test:node` - Run backend tests
- `npm run format` - Format code with Prettier
- `npm run lint` - Run ESLint
- `npm run build:db` - Build database TypeScript files
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed the database
- `npm run reset` - Reset database (undo migrations, re-run migrations and seeds)

## Project Structure

- `/app` - Next.js application routes and components
- `/config` - Configuration files
- `/db` - Database migrations, models, and seeders
- `/lib` - Shared utilities and helpers
- `/public` - Static assets
- `/services` - Business logic and API services
- `/types` - TypeScript type definitions

## Testing

The project uses Jest for testing with both Node.js and JSDOM environments. Tests are located alongside the files they test with the `.test.ts` or `.test.tsx` extension.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and ensure they pass
4. Submit a pull request

## License

This project is private and confidential.
