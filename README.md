# Home Task

This project is a **Single Page Application (SPA)** built with **React 19, TypeScript, and Vite**. It leverages **React Compiler**, which optimizes applications by automatically memoizing values, reducing unnecessary re-renders, and improving performance without requiring manual optimizations.&#x20;

---

## **Project Setup**

### **Installation**

Clone the repository and install dependencies:

```sh
npm install
```

### **Starting the Development Server**

To start the project in development mode with Hot Module Replacement (HMR):

```sh
npm run dev
```

The app will be available at `http://localhost:3000/`.

### **Running Tests**

To run unit and integration tests with Vitest:

```sh
npm run test
```

To run tests in **UI mode**:

```sh
npm run test-ui
```

---

## **Used Libraries**

### **Core Technologies**

- **React 19** – A declarative UI library for building fast and scalable applications.
- **TypeScript** – Adds static typing to JavaScript for better maintainability and error prevention.
- **Vite** – A lightning-fast development server and build tool with Hot Module Replacement (HMR).

### **State Management & Data Fetching**

- **@tanstack/react-query** – Simplifies data fetching, caching, and synchronization with minimal boilerplate.
- **Axios** – A lightweight and feature-rich HTTP client for making API requests.

### **UI & Styling**

- **Material UI (MUI) 6** – A modern component library with built-in theming support.
- **Styled-components** – Enables component-scoped styles with dynamic theming.
- **Date-fns-tz** – Provides robust date manipulation with time zone support.

### **Form Handling & Validation**

- **React-hook-form** – Optimized form management with controlled and uncontrolled inputs.
- **Zod** – Schema-based validation for form data and API responses.

### **Routing**

- **React-router-dom** – Enables dynamic and declarative routing for seamless navigation.

### **Testing**

- **Vitest** – A blazing-fast test runner with built-in support for mocking and assertions.
- **Testing Library** – Provides utilities to test React components in a user-centric way.
- **Axios-mock-adapter** – Simulates API responses for reliable testing of network requests.