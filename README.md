# Expense Chart Dashboard Angular

A responsive, accessible expense tracker built with Angular 20, TypeScript, and Signals for state management. Features include adding, editing, deleting expenses, search and filtering, dashboard summary cards, and interactive charts (pie, bar, line) with export options. The expense‐list view is lazy-loaded on demand, ensuring a performant initial bundle.


---

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

6. **Accessibility (WCAG 2.1)**  
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
   - Smaller initial bundle

10. **Unit Testing**  
    - Jasmine + Karma coverage for components and services

---

## 🛠 Tech Stack

- **Framework**: Angular 20 (standalone components)  
- **Language**: TypeScript  
- **State**: Angular Signals  
- **Charts**: ng-apexcharts (ApexCharts)  
- **Testing**: Jasmine, Karma  
- **Styles**: SCSS  

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
