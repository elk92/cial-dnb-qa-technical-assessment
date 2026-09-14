# Test Strategy

## 1. Context and Objectives

This test strategy defines the approach for validating the REST API and web components included in the CIAL Dun & Bradstreet technical assessment.

The main objective is to provide reliable feedback on functional correctness, data integrity, API behavior, and critical user-facing interactions while keeping the automation maintainable and focused on business risk.

The test suite will prioritize:
- Critical functional paths
- API request and response validation
- Data consistency and persistence
- Positive and relevant negative scenarios
- Stable and maintainable automation
- Clear feedback through meaningful assertions and test logs

## 2. Scope and Test Approach

### In Scope

#### Backend / REST API
- Validate every endpoint required by the assessment.
- Validate successful responses, HTTP status codes, and response structure.
- Validate request and response data consistency.
- Validate resource creation, update, retrieval, and deletion workflows.
- Include relevant negative scenarios based on the observed API behavior.

#### Frontend / Web Components
- Validate the required web components provided in the assessment:
  - Checkboxes
  - Drag and Drop
  - Dropdown
  - File Upload
  - Login
  - Redirect Link
- Cover the main expected user interactions and relevant negative behavior.

### Test Approach

The test approach will combine functional, integration, API, UI, regression, and exploratory testing.

Automation will focus on scenarios that provide repeatable feedback and are suitable for reliable execution in a test suite.

Test design will follow a risk-based approach, considering:
- Business and functional impact
- Likelihood of failure
- Data integrity
- Integration dependencies
- Regression value
- Automation stability and maintenance cost

The API layer will be validated independently where possible, while end-to-end workflows will be used when validating interactions across multiple operations.

## 3. Test Data and Environment

### Environment

The automated tests will interact with the public API and web applications specified in the assessment.

Because these services are externally hosted, test execution may be affected by:
- Changes in available data
- External service availability
- Environment state
- Network conditions
- Changes to the applications outside the test suite

The test suite will therefore avoid unnecessary dependencies on pre-existing mutable data whenever possible.

### Test Data Strategy

Test data will be created dynamically when the scenario requires ownership of the test data.

For resource lifecycle scenarios, the preferred approach is:
1. Create the required resource.
2. Capture the generated identifier.
3. Perform the operation under test.
4. Validate the resulting state.
5. Clean up the created resource when applicable.

Assertions will prioritize business-relevant data and state changes rather than relying exclusively on hard-coded values.

Where the assessment explicitly provides fixed resources or identifiers, those values may be used when required by the scenario, while avoiding unnecessary coupling to their current state.

## 4. Risk Assessment and Coverage

Test priority will be determined using functional impact, likelihood of failure, data integrity, integration dependencies, and regression value.

| Area | Scenario / Capability | Priority | Rationale |
|---|---|---|---|
| API | Retrieve all objects | High | Core endpoint used to validate API availability and response structure. |
| API | Retrieve objects by multiple IDs | High | Validates filtering behavior and consistency of returned resources. |
| API | Retrieve object by ID | High | Core resource retrieval operation. |
| API | Create object | High | Establishes resource creation and data persistence. |
| API | Partial update (PATCH) | High | Validates partial resource modification and preservation of existing data. |
| API | Full update (PUT) | High | Validates complete resource replacement behavior. |
| API | Delete object | High | Validates resource lifecycle and deletion behavior. |
| API | Negative scenarios | Medium | Improves robustness by validating relevant invalid or unsupported requests. |
| UI | Login | High | Represents a core user interaction and includes both positive and negative behavior. |
| UI | Checkboxes | Medium | Validates interactive state changes and user input behavior. |
| UI | Dropdown | Medium | Validates option selection and resulting UI state. |
| UI | File Upload | Medium | Validates file selection and upload interaction. |
| UI | Drag and Drop | Medium | Validates a specialized user interaction. |
| UI | Redirect Link | Medium | Validates navigation behavior between application pages. |

### Coverage Principles

The suite will prioritize high-risk scenarios first, ensuring that core API operations and critical user interactions receive reliable automated coverage.

Medium-priority scenarios will be covered when they provide meaningful regression value without introducing unnecessary automation complexity.

Negative scenarios will be selected based on actual application behavior and meaningful failure modes rather than creating assertions for undocumented or assumed requirements.

## 5. Automation Strategy

### Technology Stack

The automation suite will use:
- Cypress for API and UI automation
- TypeScript for type safety and maintainability
- Node.js as the project runtime
- Docker for reproducible test execution

### Automation Design

The test suite will be organized by application layer and functional area:

- API specifications will be grouped under cypress/e2e/api/.
- UI specifications will be grouped under cypress/e2e/ui/.
- Fixtures will contain reusable test data where appropriate.
- Cypress support files will contain shared configuration and reusable commands when they provide clear value.

The implementation will favor simple and readable test code over unnecessary abstraction.

Page Objects will not be introduced for this assessment because the UI scope is small and the required components are independent. Additional abstraction will only be introduced when it improves reuse, readability, or maintainability.

### Assertions and Test Logs

Assertions will validate meaningful outcomes rather than implementation details.

Each test will use clear cy.log() messages to describe relevant test actions and intent, providing useful execution feedback when reviewing Cypress results.

Tests will avoid excessive assertions that do not contribute to validating the scenario's expected behavior.

### Reliability and Maintainability

The automation suite will prioritize:
- Stable selectors
- Deterministic test data
- Independent test execution
- Clear assertions
- Minimal test coupling
- Reusable helpers where justified
- Maintainable test structure

Tests should fail for meaningful product behavior changes rather than environmental or implementation-specific reasons whenever possible.

