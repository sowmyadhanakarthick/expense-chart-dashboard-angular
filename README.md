# Expense Chart Dashboard Angular

A responsive, **WCAG-compliant** expense tracker built with **Angular 20**, **TypeScript**, and **Signals**. It features CRUD operations, live search, dashboard summary cards, interactive charts with export options (PNG/SVG/CSV), and **lazy-loaded** views for optimized performance.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo and Screenshots](#demo-and-screenshots)
- [Getting Started](#getting-started-local-setup)
- [Planned Enhancements](#planned-enhancements)

## Features

1. **Add Expense**  
   - Reactive form with validation  
   - Disables future dates  
   - Accessible labels and inline error messages

2. **View, Edit & Delete**  
   - “View Expenses” page lazy-loaded  
   - Edit via a modal  
   - Delete with confirmation and toast feedback

3. **Search & Filter**  
   - Live search by title or category  
   - “No results” and “No data” messages handled

4. **Dashboard Summary Cards**  
   - Total monthly expense  
   - Top spending category  
   - Transaction count  
   - Highest single expense

5. **Charts & Visualization**  
   - Reusable `<app-expense-chart>` component for `pie`, `bar`, and `line` charts  
   - ApexCharts integration  
   - Export as PNG, SVG, or CSV (custom headers/formats)

6. **Accessibility (WCAG compliant)**  
   - Semantic HTML & ARIA attributes  
   - Keyboard navigation support  

7. **Responsive Design**  
   - Mobile-first layout  
   - Adaptive grid for tables and charts

8. **State Management via Signals**  
   - Centralized `ExpenseService` with `signal<Expense[]>`  
   - Computed totals and filtering

9. **Lazy Loading**  
   - `/list` route loaded on demand

10. **Unit Testing**  
    - Jasmine + Karma tests for components and services
    - **90%+ code coverage** (viewable via /coverage/index.html after running ng test --code-coverage)

---

## Tech Stack

| Tech             | Description                     |
|------------------|---------------------------------|
| Angular 20       | Frontend framework              |
| Angular Signals  | Reactive state management       |
| ng-apexcharts    | Charting library for data visualization   |
| SCSS             | Component-based styling         |
| Jasmine & Karma  | Unit testing framework          |

---

## Demo and Screenshots

Demo : https://www.loom.com/share/f8cc91b2015a4240be08ebe8e5a4b125?sid=2498e0da-7a38-4c4b-bba7-249f729d0faa

![add-expenses](https://github.com/user-attachments/assets/7952165f-a793-4deb-bd65-61cad167c9b8)

![initial-list-page](https://github.com/user-attachments/assets/733a4492-9818-4438-a4f6-26da908554de)

![with-expenses](https://github.com/user-attachments/assets/c2f48cd6-54c1-45f0-a3d8-eeedd89cb992)

![chart-visualization](https://github.com/user-attachments/assets/c2ebceac-21a1-41e0-a948-351509f86973)

![edit-expense-modal](https://github.com/user-attachments/assets/36a42173-69b2-403b-9b8f-933f85a267be)

[pie-chart-data.csv](https://github.com/user-attachments/files/20877593/pie-chart-data.csv)

[bar-chart-data.csv](https://github.com/user-attachments/files/20877600/bar-chart-data.csv)

[line-chart-data.csv](https://github.com/user-attachments/files/20877605/line-chart-data.csv)

---

## Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/sowmyadhanakarthick/expense-chart-dashboard-angular.git
cd expense-chart-dashboard-angular
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
ng serve
```

### 4. Open the app in your browser

Visit:
http://localhost:4200

### 5. Running Unit Tests

```bash
ng test
```

## Planned Enhancements

| Feature                             | Description                                                                |
|-------------------------------------|----------------------------------------------------------------------------|
| Sorting & Advanced Filters          | Enable sorting by amount, date, category, and apply combined filters       |
| Budget & Wallet Tracking            | Allow users to set initial income or available funds (e.g., cash and bank balance). While adding an expense, users can specify the payment method (Cash/Online). Automatically update and display remaining balances for both categories in real time.       |
| Dark/Light Theme Toggle             | Provide theme switching for accessibility and user preference              |
| End-to-End Testing (Playwright)     | Automate full user journeys and ensure accessibility with Playwright       |
| Internationalization (i18n)         | Support multiple languages using Angular’s i18n module                     |
| Accessibility Audits (axe-core)     | Integrate WCAG compliance testing into development workflow                |
| Backend Integration                 | Using REST API and Firebase for persistent storage                         |
| Authentication                      | Enable user login and personalized dashboards                              |
| Pagination / Infinite Scroll        | Improve performance for large datasets with lazy loading or paging         |
| PWA Support                         | Make the app installable with offline access via Angular PWA               |

---
