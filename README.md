### challenge-QA-E2E

## Overview
Playwright E2E testing project with Docker support.

## Prerequisites
- Node.js 16+ (for local development)
- Docker and Docker Compose (for containerized execution)

## Local Setup
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run tests
npm test

# View test report
npm run report
```

## Docker Setup

### Using Docker Compose (Recommended)
```bash
# Build and run tests
npm run docker:run

# Or directly with docker-compose
docker-compose up --build
```

### Using Docker
```bash
# Build the image
npm run docker:build

# Run tests
npm run docker:test

# Or manually
docker build -t playwright-e2e .
docker run --rm \
  -v ${PWD}/playwright-report:/app/playwright-report \
  -v ${PWD}/test-results:/app/test-results \
  playwright-e2e
```

### Run specific browser
```bash
docker run --rm \
  -v ${PWD}/playwright-report:/app/playwright-report \
  -v ${PWD}/test-results:/app/test-results \
  playwright-e2e \
  npx playwright test --project=chromium
```

## Test Reports
After running tests, reports will be available in:
- `playwright-report/` - HTML reports
- `test-results/` - Test result artifacts

## Project Structure
```
pages/         - Page Object Models
tests/         - Test specifications
utils/         - Utilities and constants
```
