import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { DatePicker } from '../components/ui/date-picker';
import { Card } from '../components/ui/card';
import { Table } from '../components/ui/table';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { getCurrentUser, getMonthlyTransactions, getExpenseCategorySummary } from '../utils/supabase';
import { getCategoryLabel, getCategoryColor } from '../utils/categories';

const MonthlyTransactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filterType, setFilterType] = useState('all');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth]);

  useEffect(() => {
    applyFilters();
  }, [transactions, searchTerm, filterType]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data: userData } = await getCurrentUser();

      if (!userData || !userData.user) {
        throw new Error('User not authenticated');
      }

      // Get the start and end dates for the selected month
      const startDate = new Date(`${selectedMonth}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0); // Last day of the month

      // Format dates for query
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      // Fetch transactions for the month
      const { data: monthlyTransactions, error } = await getMonthlyTransactions(
        userData.user.id,
        startDateStr,
        endDateStr
      );

      if (error) throw error;

      // Sort transactions by date (newest first)
      const sortedTransactions = monthlyTransactions.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );

      setTransactions(sortedTransactions);

      // Calculate totals
      const income = sortedTransactions
        .filter(t => t.type === 'earning')
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const expense = sortedTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      setTotalIncome(income);
      setTotalExpense(expense);

      // Fetch expense category data for pie chart
      const year = startDate.getFullYear();
      const month = startDate.getMonth() + 1;
      const { data: categoryData, error: categoryError } = await getExpenseCategorySummary(
        userData.user.id,
        year,
        month
      );

      if (categoryError) throw categoryError;

      // Format data for the pie chart with proper category labels
      const formattedCategoryData = categoryData.map(item => ({
        ...item,
        name: getCategoryLabel(item.name, 'expense')
      }));

      setExpenseData(formattedCategoryData || []);

      // Generate weekly data for bar chart
      const weeklyData = generateWeeklyData(sortedTransactions, startDate, endDate);
      setWeeklyData(weeklyData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to group transactions by week for the bar chart
  const generateWeeklyData = (transactions, startDate, endDate) => {
    // Initialize weekly data structure
    const weeklyData = [
      { name: 'Week 1', earnings: 0, expenses: 0, days: '1-7' },
      { name: 'Week 2', earnings: 0, expenses: 0, days: '8-14' },
      { name: 'Week 3', earnings: 0, expenses: 0, days: '15-21' },
      { name: 'Week 4', earnings: 0, expenses: 0, days: '22-28' },
      { name: 'Week 5', earnings: 0, expenses: 0, days: '29+' }
    ];

    // Group transactions by week
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const dayOfMonth = transactionDate.getDate();
      const amount = Number(transaction.amount);
      
      let weekIndex;
      if (dayOfMonth <= 7) {
        weekIndex = 0; // Week 1
      } else if (dayOfMonth <= 14) {
        weekIndex = 1; // Week 2
      } else if (dayOfMonth <= 21) {
        weekIndex = 2; // Week 3
      } else if (dayOfMonth <= 28) {
        weekIndex = 3; // Week 4
      } else {
        weekIndex = 4; // Week 5
      }
      
      if (transaction.type === 'earning') {
        weeklyData[weekIndex].earnings += amount;
      } else {
        weeklyData[weekIndex].expenses += amount;
      }
    });

    return weeklyData;
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.description?.toLowerCase().includes(search) ||
        getCategoryLabel(t.category, t.type).toLowerCase().includes(search) ||
        t.amount.toString().includes(search)
      );
    }

    setFilteredTransactions(filtered);
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Monthly Transactions</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-auto"
          />
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full min-w-[250px]"
            />
            
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-32"
            >
              <option value="all">All</option>
              <option value="earning">Earnings</option>
              <option value="expense">Expenses</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Income</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
            </div>
            <ArrowUpRight className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
            </div>
            <ArrowDownRight className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Net Balance</p>
              <p className={`text-2xl font-bold ${totalIncome - totalExpense >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalIncome - totalExpense)}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
      </div>

      {/* Transactions Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-2">No transactions found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters or selecting a different month</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      transaction.type === 'earning' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryLabel(transaction.category, transaction.type)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {transaction.description || '-'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                    transaction.type === 'earning' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'earning' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Charts Section */}
      {!loading && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Expenses Pie Chart */}
          <Card className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Expenses</h2>
            
            {expenseData.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-2">No expense data for the selected month</p>
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
          
          {/* Weekly Earnings vs Expenses Bar Chart */}
          <Card className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Breakdown</h2>
            
            {weeklyData.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-2">No transaction data for the selected month</p>
                <p className="text-sm text-gray-400">Add transactions to see your weekly breakdown</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    label={{ value: 'Weeks', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    label={{ value: 'INR', angle: -90, position: 'insideLeft' }} 
                    tickFormatter={(value) => value === 0 ? '0' : `${(value / 1000).toFixed(0)}K`}
                  />
                  <RechartsTooltip 
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(name, payload) => `${name} (Days ${payload[0]?.payload.days})`}
                  />
                  <Legend />
                  <Bar dataKey="earnings" name="Earnings" fill="#4ade80" />
                  <Bar dataKey="expenses" name="Expenses" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      )}
    </motion.div>
  );
};

export default MonthlyTransactions;
