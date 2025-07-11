# Money Track

The Money Track is a full-stack web application that allows users to manage and visualize their financial activities clearly and effectively. Users initially encounter a landing page for authentication (sign-in/sign-up). Once logged in, users see a dashboard presenting recent transactions and expense distribution charts. Users can add earnings and expenses independently, review transactions monthly and visualize spending habits through dynamic charts.

## Project Overview

Money Track allows users to:
- Track earnings and expenses
- Visualize spending habits through charts
- Review monthly transactions


## Tech Stack

### Frontend
- **Framework**: React (JavaScript)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Data Visualization**: Recharts

### Backend
- **Auth & Database**: Supabase (PostgreSQL, Auth, Storage)  

## Project Conventions

### File Naming Standards

- **Components**: PascalCase (e.g., `Button.js`, `DashboardLayout.js`)
- **Utilities**: camelCase (e.g., `utils.js`, `formatDate.js`)
- **CSS**: kebab-case (e.g., `index.css`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `EXPENSE_CATEGORIES`)

### Component Structure

- Each component should be in its own file
- Components should be exported as named exports
- Components should have JSDoc comments for props

### Styling

- Use Tailwind CSS for styling
- Use shadcn UI components when possible
- Follow the blue and white theme throughout the application


## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server: `npm start`

## Environment Setup

### Supabase Setup

1. Create a new Supabase project
2. Set up the following tables:
   - `users`
   - `expenses`
   - `earnings`
3. Configure Row Level Security (RLS) policies
4. Set up authentication

## Deployment

- Frontend: Deploy to Vercel
- Backend: Hosted on Supabase


# Project Screenshots

## Landing Page
![Landing Page](images/landingpage.png)

## Sign Up Page
![Sign Up Page](images/signup.png)

## Dashboard
![Dashboard](images/dashboard.png)

## Expense Page
![Expense Page](images/expensepage.png)

## Expense List
![Expense List](images/expenselist.png)

## Earnings Page
![Earnings Page](images/earningspage.png)

## Monthly Transactions
![Monthly Transactions](images/monthlytransactions.png)

## Monthly Transactions Graphs
![MT Page](images/mtpage.png)

## Profile Page
![Profile Page](images/profile.png)

