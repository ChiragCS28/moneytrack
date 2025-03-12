import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Authentication helper functions
export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

// Session persistence
export const setupAuthListener = (callback) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session);
    }
  );
  
  return subscription;
};

// Expenses related functions
export const addExpense = async (expenseData) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expenseData])
    .select();
  return { data, error };
};

export const getExpenses = async (userId, options = {}) => {
  let query = supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId);

  // Apply date range filter if provided
  if (options.startDate && options.endDate) {
    query = query
      .gte('date', options.startDate)
      .lte('date', options.endDate);
  }

  // Apply sorting
  if (options.sortBy) {
    query = query.order(options.sortBy, { ascending: options.ascending !== false });
  } else {
    query = query.order('date', { ascending: false });
  }

  // Apply limit
  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  return { data, error };
};

export const updateExpense = async (id, updates) => {
  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const deleteExpense = async (id) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);
  return { error };
};

// Earnings related functions
export const addEarning = async (earningData) => {
  const { data, error } = await supabase
    .from('earnings')
    .insert([earningData])
    .select();
  return { data, error };
};

export const getEarnings = async (userId, options = {}) => {
  let query = supabase
    .from('earnings')
    .select('*')
    .eq('user_id', userId);

  // Apply date range filter if provided
  if (options.startDate && options.endDate) {
    query = query
      .gte('date', options.startDate)
      .lte('date', options.endDate);
  }

  // Apply sorting
  if (options.sortBy) {
    query = query.order(options.sortBy, { ascending: options.ascending !== false });
  } else {
    query = query.order('date', { ascending: false });
  }

  // Apply limit
  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  return { data, error };
};

export const updateEarning = async (id, updates) => {
  const { data, error } = await supabase
    .from('earnings')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const deleteEarning = async (id) => {
  const { error } = await supabase
    .from('earnings')
    .delete()
    .eq('id', id);
  return { error };
};

// Transactions related functions (combining expenses and earnings)
export const getRecentTransactions = async (userId, limit = 5) => {
  try {
    // Get recent expenses
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('id, amount, category, date, description')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);

    if (expensesError) throw expensesError;

    // Get recent earnings
    const { data: earnings, error: earningsError } = await supabase
      .from('earnings')
      .select('id, amount, category, date, description')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);

    if (earningsError) throw earningsError;

    // Transform and combine transactions
    const transactions = [
      ...expenses.map(expense => ({ ...expense, type: 'expense' })),
      ...earnings.map(earning => ({ ...earning, type: 'earning' }))
    ];

    // Sort combined transactions by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Return only the specified number of transactions
    return { data: transactions.slice(0, limit), error: null };
  } catch (error) {
    console.error('Error in getRecentTransactions:', error);
    return { data: [], error };
  }
};

export const getMonthlyTransactions = async (userId, startDate, endDate) => {
  try {
    // Get expenses for the month
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate);

    if (expensesError) throw expensesError;

    // Get earnings for the month
    const { data: earnings, error: earningsError } = await supabase
      .from('earnings')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate);

    if (earningsError) throw earningsError;

    // Combine and format transactions
    const transactions = [
      ...expenses.map(expense => ({ ...expense, type: 'expense' })),
      ...earnings.map(earning => ({ ...earning, type: 'earning' }))
    ];

    // Sort by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { data: transactions, error: null };
  } catch (error) {
    console.error('Error in getMonthlyTransactions:', error);
    return { data: [], error };
  }
};

export const getExpenseCategorySummary = async (userId, year, month) => {
  try {
    // Get start and end dates for the month
    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    // Get all expenses for the month
    const { data: expenses, error } = await supabase
      .from('expenses')
      .select('category, amount')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) throw error;

    // Group expenses by category and sum amounts
    const categorySummary = expenses.reduce((acc, { category, amount }) => {
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Number(amount);
      return acc;
    }, {});

    // Format data for pie chart
    const formattedData = Object.entries(categorySummary).map(([name, value]) => ({
      name,
      value
    }));

    // Sort by value (highest to lowest)
    formattedData.sort((a, b) => b.value - a.value);

    return { data: formattedData, error: null };
  } catch (error) {
    console.error('Error in getExpenseCategorySummary:', error);
    return { data: [], error };
  }
};
