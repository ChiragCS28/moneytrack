# Database Setup Instructions for Money Track

This document provides step-by-step instructions for setting up the database schema for the Money Track application in Supabase.

## Prerequisites

- You have created a Supabase project
- You have updated the `.env` file with your Supabase URL and anon key

## Steps to Create Database Schema

1. **Log in to your Supabase Dashboard**
   - Go to [https://app.supabase.io/](https://app.supabase.io/)
   - Select your Money Track project

2. **Open SQL Editor**
   - In the left sidebar, click on "SQL Editor"
   - Click "New Query" to create a new SQL script

3. **Execute the Database Schema SQL**
   - Copy the contents of the `database_schema.sql` file
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

4. **Verify Table Creation**
   - In the left sidebar, click on "Table Editor"
   - You should see two new tables: `expenses` and `earnings`
   - Click on each table to verify the columns match the schema

5. **Verify Row Level Security (RLS)**
   - In the left sidebar, click on "Authentication" > "Policies"
   - Verify that both tables have RLS enabled
   - Verify that the appropriate policies are in place for each table

## Database Schema Details

### Expenses Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `category`: TEXT
- `amount`: NUMERIC
- `date`: DATE
- `description`: TEXT
- `created_at`: TIMESTAMP WITH TIME ZONE

### Earnings Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `category`: TEXT
- `amount`: NUMERIC
- `date`: DATE
- `description`: TEXT
- `created_at`: TIMESTAMP WITH TIME ZONE

## Row Level Security (RLS) Policies

The following policies have been created:

### Expenses Table
- Users can only view their own expenses
- Users can only insert their own expenses
- Users can only update their own expenses
- Users can only delete their own expenses

### Earnings Table
- Users can only view their own earnings
- Users can only insert their own earnings
- Users can only update their own earnings
- Users can only delete their own earnings

## Troubleshooting

- If you encounter any errors during execution, check the error message in the SQL Editor
- Ensure that the `uuid-ossp` extension is enabled in your Supabase project
- Verify that your Supabase project has the correct permissions set up
