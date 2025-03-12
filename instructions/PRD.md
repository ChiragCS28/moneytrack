## Project Requirements Document (Detailed)

##  1. Overview
The **Money Track** is a full-stack web application that allows users to manage and visualize their financial activities clearly and effectively. Users initially encounter a landing page for authentication (sign-in/sign-up). Once logged in, users see a dashboard presenting recent transactions and expense distribution charts. Users can add earnings and expenses independently, review transactions monthly, visualize spending habits through dynamic charts, and receive automated weekly transaction summaries via email.

-----------------------------------------------------------------------------

## 🌟 2. Features

**Authentication**
- Landing page for user registration and login via Supabase Auth.

### Dashboard
- **Recent Transactions:** Shows top 5 recent earnings and expenses.
- **Pie Chart:** Visualizes monthly expenses divided into categories.

### Persistent Sidebar (Available on all pages)
- Always visible for easy navigation with these options:
  1. **Dashboard:** Overview and recent activity visualization.
  2. **Earnings:** Separate form page for adding income transactions.
  3. **Expenses:** Dedicated form page for adding expense transactions.
  4. **Monthly Transactions:** Detailed monthly transaction history (earnings in green, expenses in red), and a pie chart breakdown of expenses. Will show recent transactions by default. Will have a month picker to filter transactions

### User Profile
- Clickable profile icon at the top-right corner.
- View and edit profile details (name, username, avatar).

### Weekly Email Reports
- Every Monday, an email summarizing all transactions from the previous week will be sent automatically to the user.

---

## 🚀 2. Features
- User Authentication (Sign-in/Signup via email)
- Earnings logging 
- Expenses logging
- Display of recent transactions.
- Visual analytics (monthly pie chart breakdown)
- Monthly transactions filter and view
- Weekly automated summary emails
- Interactive UI with smooth transitions and clear visualizations
- User-friendly and responsive design
- Secure and reliable data storage

------------------------------------------------------------------------------

## 💻 3. Tech Stack Used

**Frontend:**
- Framework: **React (JavaScript)**
- Styling: **Tailwind CSS** + **shadcn/ui**
- Animations/UI Effects: **Framer Motion**
- Icons: **Lucide Icons**
- Data Visualization: **Recharts**

**Backend:**
- Auth & Database: **Supabase (PostgreSQL, Auth, Storage, Realtime DB)**
- Serverless logic: **Supabase Edge Functions**
- Email: **SendGrid (integrated with Supabase Edge Functions)**
- Database Interaction: **Supabase JavaScript Client**

**Deployment:**
- Frontend: **Vercel**
- Backend & Database: **Supabase**

--------------------------------------------------------------------------------

## 📦 4. Required Packages

## 📦 **Frontend Packages (React)**

- **React core libraries**
  - `react`
  - `react-dom`
  - `react-router-dom`

- **Styling & UI**
  - `tailwindcss`
  - `shadcn-ui`

- **Icons**
  - `lucide-react`

- **Animations & UI Effects**
  - `framer-motion`

- **Data Visualization**
  - `recharts`

- **Database Client & Backend Communication**
  - `@supabase/supabase-js`


---

## Backend (Supabase Edge Functions)
- Supabase JavaScript Client:
  - `@supabase/supabase-js`

- **Email Integration**
  - `@sendgrid/mail`



This package list clearly defines what the developer needs to install and manage, covering all frontend and backend functionalities for the Money Track application.

--------------------------------------------------------------------------------

## 🗃️ 5. Database Structure (Supabase PostgreSQL)

### 🧑‍💻 **Users** table *(managed by Supabase Auth)*

| Column        | Data Type      | Description                      |
|---------------|----------------|----------------------------------|
| id            | UUID           | Primary Key (auto-generated)     |
| email         | text           | Email (unique)                   |
| username      | text           | Username                         |
| full_name     | text           | User's full name                 |
| avatar_url    | text           | URL of user's profile picture    |
| created_at    | timestamp      | Timestamp of user creation       |

---

### 💸 **Expenses** table

| Column        | Data Type     | Description                             |
|---------------|---------------|-----------------------------------------|
| id            | UUID          | Primary Key (auto-generated)            |
| user_id       | UUID          | FK to users(id)                         |
| category      | text          | Expense Category                        |
| amount        | numeric       | Amount spent                            |
| date          | date          | Expense date                            |
| description   | text          | Optional note                           |
| created_at    | timestamp     | Timestamp of record creation            |

---

### 💰 **Earnings** table

| Column        | Data Type     | Description                              |
|---------------|---------------|------------------------------------------|
| id            | UUID          | Primary Key (auto-generated)             |
| user_id       | UUID          | FK to users(id)                          |
| category      | text          | Earnings category                        |
| amount        | numeric       | Amount earned                            |
| date          | date          | Date earnings were recorded              |
| description   | text          | Optional description                     |
| created_at    | timestamp     | Timestamp of record creation             |


--------------------------------------------------------------------------------

## ✅ **Product Requirements & Acceptance Criteria**


### 🔐 **1. Authentication & Landing Page**
- User can **successfully sign-up and log in** using Supabase Authentication.
- Authenticated users are redirected automatically to the dashboard.
- Unauthenticated users cannot access internal pages (Dashboard, Earnings, Expenses, Monthly Transactions).

---

### 📊 **2. Dashboard Page**
- Persistent **Sidebar Navigation** clearly displays these options:
  - Dashboard (default view)
  - Earnings
  - Expenses
  - Monthly Transactions
- The dashboard displays **5 most recent transactions** on the left side. (earnings shown in **green**, expenses in **red**).
- Transactions are sorted by the most recent one at the top to less recent ones at the bottom.
- Transactions includes 4 coloums to be displayed(Date, Category, Amount, Expense/Earnings, and Description)
- A clearly visible **Pie Chart** on the right side showing the user's **expenses distribution** for the current month.

---

### 💸 **2. Earnings & Expenses (Separate Pages)**
- Separate forms/pages for entering **earnings** and **expenses**.
- Each form contains clearly defined fields:
  - **Category** (fixed dropdown list)
  - **Amount** (numeric input, in INR)
  - **Date** (date picker)
  - **Description/Note** (optional text input)
- User can successfully save data into respective tables (`earnings` & `expenses`) without errors.

---

### 📅 **3. Monthly Transactions Page**
- By deault the recent transactions (top 10) will be displayed
- User can select **any month** using a dropdown or calendar picker.
- Clearly displays all transactions (earnings shown in **green**, expenses in **red**) for the selected month.
- Pie chart visualizing **expenses distribution** for the chosen month updates dynamically.

---

### 📊 **3. Data Visualization**
- Pie charts accurately visualize categorized expense data using Recharts.
- Pie charts clearly indicate spending percentages and categories, updating dynamically based on user selection.

---

### 📩 **4. Weekly Email Notifications**
- Users automatically receive a **weekly summary email** every Monday.
- Email clearly summarizes all transactions (earnings & expenses) from the **previous week**.
- Emails are sent using **SendGrid** integrated with **Supabase Edge Functions**.

---

### 🗃️ **4. Database & Data Handling**
- All data stored securely in **Supabase PostgreSQL**.
- Database schema includes `users`, `expenses`, and `earnings` tables.
- Proper foreign keys established and enforced:
  - `expenses.user_id → users.id`
  - `earnings.user_id → users.id`
- Robust **Row Level Security (RLS)** rules ensure users only access their own data.

---

### 👤 **5. User Profile Management**
- User profile icon displayed clearly on the top-right corner of every page.
- Clicking profile allows viewing and editing:
  - Username, full name, email
  - Profile picture (avatar), stored securely in Supabase storage.

---

### 🌐 **6. Responsive & Intuitive UI**
- Application is **responsive and mobile-friendly**.
- Persistent sidebar provides clear navigation across all pages.
- Animations and transitions (Framer Motion) enhance UX, providing clear feedback and interactive feel.
- Icons (Lucide) clearly represent each sidebar option and navigation elements.

---

### ⚙️ **7. Categories (Dropdown)**
- Clearly defined and fixed categories provided in dropdowns:

#### **Expenses Categories**
- Food & Dining, Groceries, Shopping, Fuel, Transportation, Credit Card Bills, Phone & Internet, Miscellaneous.

#### **Earnings Categories**
- Salary, Freelancing, Investments, Gifts, Bonuses, Miscellaneous.

---

### 🧑‍💻 **8. Persistent Sidebar & Navigation**
- Sidebar **always visible** regardless of the current page (Dashboard, Earnings, Expenses, Monthly Transactions).
- Smooth transitions between pages without page refresh (using React Router DOM).

---

### ✨ **7. Animations & Visual Enhancements**
- Smooth, appealing animations and transitions implemented using **Framer Motion**.
- Consistent, professional design using **Tailwind CSS** and **shadcn components**.

---

### 🧹 **7. Error Handling & User Feedback**
- Clear and concise feedback/messages displayed upon errors or successful actions (like successful data entry or profile updates).
- Appropriate loading indicators for all async operations.

----

### ✅ **8. Testing & Deployment**
- Thoroughly tested and verified functionality before deployment:
  - Frontend components tested for responsiveness and functionality.
  - Backend functionalities tested (transaction entry, data fetching, email sending, authentication).
- Application deployed successfully:
  - Frontend on **Vercel**
  - Backend (database and auth) hosted on **Supabase**.

---

## 🎯 **Final Checks for Project Completion:**
- All functionalities listed above implemented.
- Responsive across devices.
- Secure authentication and data storage.
- Weekly email summaries functioning reliably.
- Intuitive UI with smooth interactions and clear visualizations.


Use this detailed, structured **Final PRD & Acceptance Criteria** as your complete guide during development and final evaluation to ensure all intended functionalities and user experiences are achieved effectively.


----------------------------------------------------------------------------------------------

## 🧩 6. Application Structure & Implementation Steps:

Follow these structured steps for a clear development roadmap:


### ✅ **Step 1: Project Initialization & Setup**
- The main folder (root directory) called `moneytrack`is already created. It contains a folder called 'instructions' that contains several files that has the instructions for the project. Nothing else has been done ie. no dependencies have been installed. The project has to be taken off from here. But no need to create a new folder for the project as thats been covered.
- Set up React project structure clearly (folders for components, layouts, pages, assets, utils).
- Configure and initialize Tailwind CSS and integrate shadcn UI components.
- Establish clear project conventions and file naming standards.

---

## 🔐 Step 2: User Authentication & Landing Page
- Configure authentication via Supabase Auth (Email-based login/signup).
- Develop a responsive landing page (login & signup forms UI). Should have good UI with the name of the web application "Money Track" displayed. Should display the options of signup or login to the user.
- Use a professional theme colors of blue and white (and its associated shades) throughout the website
- Implement user session persistence (redirect authenticated users automatically to Dashboard).

---

## 📂 Step 3: Database Schema Creation (Supabase/PostgreSQL)
- Create tables: `expenses`, `earnings`, utilizing existing Supabase-managed `users` table.
- Define relationships (foreign keys) between the transactions and users.
- Set Row-Level Security (RLS) policies to protect user-specific data.

---

## 🎛️ Step 4: Persistent Sidebar Navigation & Routing
- Implement persistent sidebar layout, always visible across all authenticated pages.
- Create dedicated sidebar navigation links clearly:
  1. Dashboard
  2. Earnings
  3. Expenses
  4. Monthly Transactions
  5. Profile
- Set up routing clearly using React Router DOM.

---

## 📊 Step 5: Dashboard Development
- Fetch recent transactions data dynamically from Supabase.
- Display the latest **five transactions** on the left side of the dashboard.
- Implement a **monthly expenses pie chart** using Recharts on the right side.

---

## 📝 Step 6: Earnings & Expenses Data Entry Pages
- Create separate pages/forms for adding Earnings and Expenses.
- Include fields clearly (category, amount, date, description/note).
- Implement form validation and data submission to Supabase database.

- Here’s a comprehensive yet concise set of **fixed categories** you can use for your Money Track application:

### Expense Categories:
- 🍔 **Food & Dining**
- 🛒 **Groceries**
- 🛍️ **Shopping**
- ⛽️ **Fuel**
- 🚗 **Transportation**
- 🏠 **Rent & Utilities**
- 💳 **Credit Card Bills**
- 🏥 **Healthcare**
- 📚 **Education**
- 🎬 **Entertainment**
- 🛫 **Travel**
- 💡 **Subscriptions**
- 🎁 **Gifts & Donations**
- 🧾 **Taxes**
- 📱 **Phone & Internet**
- 📅 **Miscellaneous**

### Earnings Categories:
- 💼 **Salary**
- 💵 **Freelancing**
- 📈 **Investments**
- 🏦 **Interest & Dividends**
- 🎁 **Gifts Received**
- 🏅 **Awards & Bonuses**
- 💳 **Refunds**
- 📅 **Other Income**


This set of fixed categories provides a good balance between clarity and detail, ensuring your users have a streamlined yet informative financial overview.

---

## 📅 Step 7: Monthly Transactions Page
- Allow user selection of specific months (dropdown or date picker).
- Fetch all transactions (earnings + expenses) for the selected month.
- Display transactions clearly: **earnings in green** and **expenses in red**.


## Step 8: Graphs within the Monthly Transactions Page:
- These graphs should come below the transactions table.
- Integrate and display a pie chart for monthly expenses categorized clearly on the left half of the page.(same as the one in dashboard)
- Next to the pie chart,on the right half of the screen, create a clear and intuitive grouped bar chart visualization. The chart should consist of distinct columns, each representing one week of the selected month:

Column 1: Days 1-7
Column has two bars: Earnings and Expenses (which are added on these dates of the particular month)
Column label: Week 1
Earnings bar color: Green
Expenses bar color: Red

Similarly,

Column 2: Week 2 (Days 8–14)
Column 3: Week 3 (Days 15–21)
Column 4: Week 4 (Days 22–28)
Column 5: Week 5 (Days 29–end of month; if the dates exist in the month)
All earnings bars in green and all expenses bars in red. Each week's earnings and expenses should be placed clearly side by side within each week's column.

Include clear axis labels (INR on the y-axis and Weeks on the x-axis) and legends clearly identifying Earnings and Expenses.

---

## 👤 Step 9: User Profile Management
- Create a dedicated page for user profile present in the sidebar itself
- Allow users to **view** and **edit profile details** (username, full name, avatar image).
- Implement profile avatar upload functionality using Supabase storage.

---

## 📧 Step 10: Weekly Email Notifications (Backend Logic)
- Set up Supabase Edge Function to automatically run every Monday.
- Fetch the user's transaction data for the previous week.
- Format transaction data clearly and integrate with SendGrid to send weekly email summaries.

---

## ✨ Step 11: UI Enhancements & Animations
- Use Framer Motion to add interactive transitions and animations.
- Ensure responsive and user-friendly design across pages (Dashboard, Forms, Sidebar navigation, and Charts).

---

## ⚙️ Step 12: Deployment & Hosting
- Deploy the frontend application to **Vercel**.
- Host backend (database and authentication) via Supabase.
- Configure environment variables clearly on both frontend and backend deployment environments.

---

## ✅ Step 13: Testing, Debugging & Optimization
- Conduct thorough frontend component testing (unit, integration, end-to-end testing).
- Test database interactions, API calls, and email notification functionality rigorously.
- Optimize data fetching queries, improve performance, and refine user experience.

---

## 🚨 Step 14: Error Handling & User Feedback Implementation
- Implement comprehensive error-handling strategies across the application.
- Clearly communicate errors and validation issues to users with informative UI messages.
- Handle network errors, authentication issues, and invalid data inputs gracefully.


This structured roadmap helps guide the development team effectively, clarifying each step from initialization to deployment clearly.

-----------------------------------------------------------------------------------------


## 🎯 Conclusion
This detailed PRD serves as a clear, actionable guide, ensuring the development process is organized and efficient, enabling seamless execution and delivery of your **Money Track* web application.