import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { getRecentTransactions, getExpenseCategorySummary, getCurrentUser } from '../utils/supabase';
import { getCategoryLabel, getCategoryColor } from '../utils/categories';
import { Card } from '../components/ui/card';

const Dashboard = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: userData } = await getCurrentUser();
        
        if (!userData || !userData.user) {
          throw new Error('User not authenticated');
        }
        
        const userId = userData.user.id;
        
        // Get current month and year
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        
        // Fetch recent transactions
        const { data: transactions, error: transactionsError } = await getRecentTransactions(userId, 5);
        
        if (transactionsError) throw transactionsError;
        
        setRecentTransactions(transactions || []);
        
        // Calculate totals
        const expenses = transactions.filter(t => t.type === 'expense');
        const earnings = transactions.filter(t => t.type === 'earning');
        
        setTotalExpenses(expenses.reduce((sum, t) => sum + Number(t.amount), 0));
        setTotalEarnings(earnings.reduce((sum, t) => sum + Number(t.amount), 0));
        
        // Fetch expense category data for pie chart
        const { data: categoryData, error: categoryError } = await getExpenseCategorySummary(
          userId, 
          currentYear, 
          currentMonth
        );
        
        if (categoryError) throw categoryError;
        
        // Format data for the pie chart with proper category labels
        const formattedCategoryData = categoryData.map(item => ({
          ...item,
          name: getCategoryLabel(item.name, 'expense')
        }));
        
        setExpenseData(formattedCategoryData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Recent Earnings</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalEarnings)}</p>
        </Card>
        
        <Card className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Recent Expenses</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
        </Card>
        
        <Card className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Balance</h3>
          <p className={`text-2xl font-bold ${totalEarnings - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalEarnings - totalExpenses)}
          </p>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
          
          {recentTransactions.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">No recent transactions found</p>
              <p className="text-sm text-gray-400">Add your first transaction to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getCategoryLabel(transaction.category, transaction.type)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        transaction.type === 'earning' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'earning' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.description || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        
        {/* Monthly Expenses Pie Chart */}
        <Card className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Expenses</h2>
          
          {expenseData.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">No expense data for the current month</p>
              <p className="text-sm text-gray-400">Add expenses to see your spending breakdown</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getCategoryColor(index)} 
                    />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => formatCurrency(value)} 
                  labelFormatter={(name) => name}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;
