# Money Track

A full-stack web application for managing and visualizing personal finances.

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
- **Serverless Logic**: Supabase Edge Functions
  

## Project Structure

```
moneytrack/
├── public/                 # Static files
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable components
│   │   └── ui/             # UI components (shadcn)
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components
│   └── utils/              # Utility functions
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── README.md               # Project documentation
```

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
