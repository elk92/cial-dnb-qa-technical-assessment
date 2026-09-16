# CIAL Dun & Bradstreet — QA Technical Assessment

## Overview

This repository contains my solution for the CIAL Dun & Bradstreet Senior QA Engineer technical assessment.

The project implements automated functional coverage for the REST API and web components defined in the assessment, using Cypress and TypeScript.

The automation strategy focuses on providing reliable and maintainable feedback around:

- Functional correctness
- API behavior and HTTP responses
- Request and response data integrity
- Resource lifecycle and persistence
- Positive and relevant negative scenarios
- Critical user-facing interactions
- Test independence and maintainability

The implementation was designed with a risk-based mindset, prioritizing the scenarios required by the assessment while avoiding unnecessary framework complexity.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Cypress 16 | API and UI test automation |
| TypeScript 7 | Type safety and maintainability |
| Node.js | Project runtime |
| Docker | Reproducible test execution |
| Git | Version control |

---

## Test Coverage

The suite currently contains:

- **14 Cypress spec files**
- **20 automated test cases**
- **20 passing**
- **0 failing**
- **0 skipped**
- **0 pending**

The complete suite was also executed successfully inside Docker.

### Coverage Overview

| Layer | Spec Files | Tests |
|---|---:|---:|
| API | 8 | 10 |
| UI | 6 | 10 |
| **Total** | **14** | **20** |

---

# API Test Coverage

The API automation covers all endpoints required by the technical assessment.

## GET — Retrieve all objects

**Endpoint**

`GET /objects`

Coverage includes:

- HTTP status validation
- Response type validation
- Non-empty collection validation
- Object structure validation
- `id` and `name` type validation

---

## GET — Retrieve objects by multiple IDs

**Endpoint**

`GET /objects?id=3&id=5&id=10`

Coverage includes:

- HTTP status validation
- Response collection validation
- Validation that the expected number of objects is returned
- Validation that returned IDs match the requested IDs
- Basic response data type validation

---

## GET — Retrieve object by ID

**Endpoint**

`GET /objects/7`

Coverage includes:

- Successful HTTP response
- Requested object ID validation
- Response object structure
- Object name type validation
- Optional data structure validation

---

## POST — Create object

**Endpoint**

`POST /objects`

The required assessment payload is submitted with:

- Name
- Data
  - Year: 2019
  - Price: 1849.99
  - CPU: Intel Core i9
  - Hard disk: 1 TB

The test validates:

- Successful creation
- Generated resource ID
- Request/response data consistency
- Persistence through a subsequent GET request

The generated identifier is captured dynamically rather than relying on a hard-coded ID.

---

## PATCH — Partial update

**Endpoint**

`PATCH /objects/{id}`

The test first creates a resource and then performs a partial update.

Coverage includes:

- Successful partial update
- Updated field validation
- Resource ID preservation
- Existing data preservation
- Persistence of the updated state

This approach validates PATCH behavior through a controlled resource lifecycle rather than depending on mutable pre-existing data.

---

## PUT — Full update

**Endpoint**

`PUT /objects/{id}`

The test creates a resource and then replaces it using the complete representation required by the assessment.

Coverage includes:

- Successful replacement
- Complete field validation
- Resource ID preservation
- Updated name and data
- Required `silver` color
- Persistence of the resulting representation

---

## DELETE — Resource lifecycle

**Endpoint**

`DELETE /objects/{id}`

The assessment requires the object to be created before deletion.

The automated scenario follows the complete lifecycle:

```text
Create resource
      ↓
Capture generated ID
      ↓
Delete resource
      ↓
Verify resource is no longer available
```

The test validates both the deletion response and the subsequent `404` when attempting to retrieve the deleted resource.

---

## Negative API Scenarios

Relevant negative scenarios were included based on observable API behavior and meaningful failure modes.

The suite validates `404` responses for:

- Retrieving a nonexistent object
- Updating a nonexistent object
- Deleting a nonexistent object

The tests intentionally avoid asserting undocumented behavior.

For example, unsupported assumptions about validation rules are not turned into artificial expectations. Negative coverage is based on behavior that can be meaningfully validated against the target API.

---

# UI Test Coverage

The frontend suite covers all components explicitly required by the assessment.

## Checkboxes

Coverage includes:

- Expected initial state
- Checking and unchecking controls
- Resulting UI state

## Drag and Drop

Coverage includes:

- Dragging column A to column B
- Verifying the resulting column order

## Dropdown

Coverage includes:

- Expected dropdown options
- Selecting available options
- Verifying the selected state

## File Upload

Coverage includes:

- Selecting the provided fixture file
- Uploading the file
- Validating the resulting uploaded state

Test fixture:

`cypress/fixtures/test-upload.txt`

## Login

Coverage includes:

- Successful login with valid credentials
- Invalid username
- Invalid password

Both positive and negative authentication behavior are covered.

## Redirect Link

Coverage includes:

- Selecting the target link
- Verifying navigation to the expected status codes page

---

# Project Structure

```text
cial-dnb-qa-technical-assessment/
│
├── .dockerignore
├── .gitignore
├── Dockerfile
├── cypress.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
│
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── create-object.cy.ts
│   │   │   ├── delete-object.cy.ts
│   │   │   ├── get-all-objects.cy.ts
│   │   │   ├── get-object-by-id.cy.ts
│   │   │   ├── get-objects-by-ids.cy.ts
│   │   │   ├── negative-scenarios.cy.ts
│   │   │   ├── update-object-patch.cy.ts
│   │   │   └── update-object-put.cy.ts
│   │   │
│   │   └── ui/
│   │       ├── checkboxes.cy.ts
│   │       ├── drag-and-drop.cy.ts
│   │       ├── dropdown.cy.ts
│   │       ├── login.cy.ts
│   │       ├── redirect-link.cy.ts
│   │       └── upload-file.cy.ts
│   │
│   ├── fixtures/
│   │   └── test-upload.txt
│   │
│   └── support/
│       └── e2e.ts
│
└── docs/
    └── test-strategy.md
```

---

# Automation Design

## Test Organization

Tests are organized by application layer:

```text
cypress/e2e/api/
cypress/e2e/ui/
```

This keeps API and UI concerns separated while allowing the complete suite to be executed through the standard Cypress command.

Individual spec files are organized around functional capabilities rather than technical implementation details.

---

## Test Data Strategy

The automation prefers dynamically created test data whenever the scenario requires control over the resource lifecycle.

The general approach is:

```text
Create
  ↓
Capture generated ID
  ↓
Perform operation
  ↓
Validate response
  ↓
Validate resulting state
```

This reduces unnecessary coupling to mutable pre-existing resources.

Where the assessment explicitly requires a fixed resource, such as `/objects/7`, the specified identifier is used.

---

## Assertions

Assertions focus on meaningful behavior and data integrity.

Examples include:

- HTTP status codes
- Response type
- Resource identifiers
- Required fields
- Data values
- Persistence
- State changes
- Expected error responses

The suite avoids large numbers of assertions that do not provide additional confidence.

---

## Test Independence

Tests are designed to minimize unnecessary coupling between scenarios.

For resource lifecycle operations such as PATCH, PUT, and DELETE, the tests create their own resources where appropriate and capture the generated identifier dynamically.

This makes the scenarios less dependent on the current state of the public API.

---

# Architectural Decisions

## Why Cypress?

Cypress was selected because the assessment explicitly requires Cypress and because it provides a unified approach for both API and browser-based testing.

Using the same framework across both layers also keeps test execution and project structure simple for a small technical assessment.

---

## Why TypeScript?

TypeScript provides stronger typing for API responses and improves maintainability as the automation suite grows.

Explicit typing is particularly useful when validating structured API responses and reduces ambiguity when working with response bodies.

---

## Why no Page Objects?

Page Objects were intentionally not introduced for this assessment.

The UI scope is small and consists of independent demonstration components. Introducing a Page Object layer would add abstraction without providing meaningful reuse at the current scale.

The implementation therefore favors explicit, readable tests.

If the application scope increased and the same business interactions became shared across multiple scenarios, a Page Object or another abstraction could be introduced where it provides clear value.

---

## Why no Custom Commands?

Custom Cypress commands were also not introduced because the current suite does not contain enough repeated business interactions to justify another abstraction layer.

The goal is to keep the test intent visible and easy to trace.

Reusable commands or helpers can be introduced when repeated behavior becomes meaningful enough to improve maintainability.

---

# Test Strategy

The detailed test strategy is documented separately:

[`docs/test-strategy.md`](docs/test-strategy.md)

The strategy follows a risk-based approach considering:

- Functional impact
- Likelihood of failure
- Data integrity
- Integration dependencies
- Regression value
- Automation stability
- Maintenance cost

The automated suite prioritizes the API operations and user interactions explicitly required by the assessment.

---

# Running the Tests

## Prerequisites

To execute the tests locally, install:

- Node.js
- npm

Then install the project dependencies:

```bash
npm ci
```

---

## Run the Complete Test Suite

```bash
npm test
```

---

## Run the Cypress Interactive Runner

```bash
npm run test:open
```

---

## Run API Tests Only

```bash
npm run test:api
```

---

## Run UI Tests Only

```bash
npm run test:ui
```

---

## Run the Suite Using Chrome

```bash
npm run test:chrome
```

Chrome can be used to avoid relying on Cypress's deprecated Electron test browser.

---

# Docker

The project includes a Dockerfile to provide a reproducible test execution environment.

The image is based on:

```text
cypress/included:16.0.0
```

## Build the Image

```bash
docker build -t cial-dnb-qa-assessment .
```

## Run the Test Suite

```bash
docker run --rm cial-dnb-qa-assessment
```

The containerized execution was validated successfully with:

```text
14 specs
20 tests
20 passing
0 failing
```

The complete containerized execution finished in approximately 41 seconds.

---

# Environment Considerations

The tests interact with publicly hosted APIs and web applications.

Because the target systems are externally hosted, execution may be affected by:

- Network conditions
- External service availability
- Changes in application behavior
- Changes in available test data
- Changes to the public environment

The automation therefore avoids unnecessary dependencies on mutable pre-existing resources whenever possible.

---

# Known Considerations

## Public API Test Data

Some API scenarios create resources in the public test API.

For creation and update scenarios, the generated resources are used during the test lifecycle. The DELETE scenario explicitly removes the resource it creates.

Because the assessment uses an externally hosted public API, complete environment-level cleanup cannot be guaranteed by the test suite.

In a controlled QA environment, the preferred approach would be to use dedicated test data or an environment reset/cleanup mechanism.

---

## Browser Execution

The project includes a dedicated Chrome execution script:

```bash
npm run test:chrome
```

This provides an alternative browser execution path without changing the default assessment setup.

---

# Test Execution Result

The final containerized execution produced:

| Metric | Result |
|---|---:|
| Specs | 14 |
| Tests | 20 |
| Passing | 20 |
| Failing | 0 |
| Pending | 0 |
| Skipped | 0 |
| Duration | ~41s |

All required API and UI scenarios passed successfully during the Docker execution.

---

# Quality Approach

The implementation prioritizes **confidence over test volume**.

Rather than maximizing the number of automated cases, the suite focuses on validating:

1. Core API functionality
2. Resource lifecycle behavior
3. Data integrity and persistence
4. Meaningful negative scenarios
5. Required user interactions
6. Test independence
7. Maintainable automation design

The framework structure is intentionally lightweight for the scope of the assessment, while leaving room for additional abstraction and coverage as the application grows.

---

# Author

**Elcio Santos Filho**

Senior QA Engineer

Focused on software quality, test automation, API testing, end-to-end testing, risk-based testing, and quality engineering.