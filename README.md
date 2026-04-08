# Salary Management API

Backend API for managing employees, computing salary deductions by country, and aggregating salary metrics. Built as a layered Express service with SQLite persistence and a consistent JSON envelope for every response.

## Tech stack

- **Node.js** (v22+)
- **Express**
- **TypeScript**
- **Sequelize** + **SQLite**
- **Joi** (request validation)
- **Jest** + **Supertest** (integration tests)

## Database choice

SQLite is used for simplicity and ease of setup, allowing the project to run without external dependencies.  
The architecture is designed so it can be easily extended to use databases like MySQL or PostgreSQL in a production environment.

## Salary rules

Salary deductions are calculated based on the employee's country:

- **India:** 10% deduction
- **United States:** 12% deduction
- **Other countries:** no deduction

Net salary = gross salary − deduction

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the API:
   - Development: `npm run dev`
   - Production build: `npm run build` then `npm start`
4. Run tests: `npm test`

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the server with hot reload (`tsx watch`) |
| `npm run build`   | Compile TypeScript to `dist/`        |
| `npm test`        | Run the Jest test suite              |

Other useful commands: `npm run test:watch`, `npm run test:coverage`, `npm start` (requires `npm run build` first).

## API endpoints

| Method & path | Description |
| ------------- | ----------- |
| `POST /employees` | Create an employee |
| `GET /employees/:id` | Get an employee by id |
| `PUT /employees/:id` | Update an employee |
| `DELETE /employees/:id` | Delete an employee |
| `GET /employees/:id/salary` | Gross salary, deduction, and net salary for that employee |
| `GET /metrics/country?name=India` | Min, max, and average salary for a country |
| `GET /metrics/job?title=Backend%20Engineer` | Average salary for a job title |

## Response format

All success and error responses use the same shape:

```json
{
  "success": true,
  "message": "string",
  "statusCode": 200,
  "data": {}
}
```

- **`success`** — whether the operation succeeded  
- **`message`** — human-readable summary  
- **`statusCode`** — mirrors the HTTP status code  
- **`data`** — payload on success; often `{}` on validation or not-found errors  

Validation errors return **400**; missing resources return **404** with the same structure.

## Architecture

HTTP requests flow through **routes** → **controllers** (thin) → **services** (business logic) → **repositories** (data access) → **Sequelize models**. Joi validates bodies, route params, and query strings before controllers run. Errors are handled in one place and mapped to the unified response format.

The separation ensures testability, maintainability, and clear responsibility boundaries.

## TDD

Features were developed with tests first: write a failing test, implement the minimum code to pass, then refactor while keeping tests green. Commits follow this cycle to clearly reflect the evolution of each feature.

## AI usage

AI tools were used as a support system during development for:

- understanding and structuring test cases
- improving commit messages and clarity
- identifying potential edge cases
- refining and optimizing parts of the implementation

All core design decisions, architecture, and final code structure were reviewed and guided manually to ensure correctness, readability, and alignment with the assignment requirements.
