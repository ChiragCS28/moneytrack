import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getCurrentUser, addEarning } from '../utils/supabase';
import { earningCategories } from '../utils/categories';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Alert } from '../components/ui/alert';

const Earnings = () => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear success message when form is being edited
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Get current user
      const { data: userData } = await getCurrentUser();
      
      if (!userData || !userData.user) {
        throw new Error('User not authenticated');
      }

      // Insert earning record
      const { error: earningError } = await addEarning({
        user_id: userData.user.id,
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: formData.date,
        description: formData.description
      });
      
      if (earningError) throw earningError;

      // Clear form and show success message
      setFormData({
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error adding earning:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto py-8 px-4"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Earning</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          {error}
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
          Earning added successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full"
          >
            <option value="">Select a category</option>
            {earningCategories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (₹)
          </label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="Enter amount"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a note about this earning"
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
              Adding...
            </>
          ) : (
            'Add Earning'
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default Earnings;
