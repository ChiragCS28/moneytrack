// Predefined categories for expenses and earnings with emojis and labels
export const expenseCategories = [
  { value: 'food_dining', label: '🍔 Food & Dining' },
  { value: 'groceries', label: '🛒 Groceries' },
  { value: 'shopping', label: '🛍️ Shopping' },
  { value: 'fuel', label: '⛽️ Fuel' },
  { value: 'transportation', label: '🚗 Transportation' },
  { value: 'rent_utilities', label: '🏠 Rent & Utilities' },
  { value: 'credit_card_bills', label: '💳 Credit Card Bills' },
  { value: 'healthcare', label: '🏥 Healthcare' },
  { value: 'education', label: '📚 Education' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'travel', label: '🛫 Travel' },
  { value: 'subscriptions', label: '💡 Subscriptions' },
  { value: 'gifts_donations', label: '🎁 Gifts & Donations' },
  { value: 'taxes', label: '🧾 Taxes' },
  { value: 'phone_internet', label: '📱 Phone & Internet' },
  { value: 'miscellaneous', label: '📅 Miscellaneous' }
];

export const earningCategories = [
  { value: 'salary', label: '💼 Salary' },
  { value: 'freelancing', label: '💵 Freelancing' },
  { value: 'investments', label: '📈 Investments' },
  { value: 'interest_dividends', label: '🏦 Interest & Dividends' },
  { value: 'gifts_received', label: '🎁 Gifts Received' },
  { value: 'awards_bonuses', label: '🏅 Awards & Bonuses' },
  { value: 'refunds', label: '💳 Refunds' },
  { value: 'other_income', label: '📅 Other Income' }
];

// Get category label from value, with fallback to formatted value
export const getCategoryLabel = (categoryValue, type = 'expense') => {
  if (!categoryValue) return 'Uncategorized';
  
  const categories = type === 'expense' ? expenseCategories : earningCategories;
  const category = categories.find(cat => cat.value === categoryValue);
  
  if (category) return category.label;
  
  // Fallback: Format the value if no matching category found
  return categoryValue
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Get category emoji from value
export const getCategoryEmoji = (categoryValue, type = 'expense') => {
  if (!categoryValue) return '📅';
  
  const categories = type === 'expense' ? expenseCategories : earningCategories;
  const category = categories.find(cat => cat.value === categoryValue);
  
  if (category) {
    const emoji = category.label.split(' ')[0];
    return emoji;
  }
  
  return '📅';
};

// Get all category values
export const getCategoryValues = (type = 'expense') => {
  const categories = type === 'expense' ? expenseCategories : earningCategories;
  return categories.map(cat => cat.value);
};

// Get category color for charts with a consistent color scheme
export const getCategoryColor = (index) => {
  // Array of colors optimized for data visualization
  const colors = [
    '#0088FE', // Blue
    '#00C49F', // Green
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#8884D8', // Purple
    '#82CA9D', // Light Green
    '#FFC658', // Light Yellow
    '#8DD1E1', // Light Blue
    '#A4DE6C', // Lime Green
    '#D0ED57', // Yellow Green
    '#F78CA0', // Pink
    '#748FFC', // Periwinkle
    '#E6B89C', // Peach
    '#9B8816', // Olive
    '#93C3EE', // Sky Blue
    '#F2B701'  // Gold
  ];
  
  // Ensure we always return a valid color by using modulo
  return colors[index % colors.length];
};

// Get all categories for a type
export const getCategories = (type = 'expense') => {
  return type === 'expense' ? expenseCategories : earningCategories;
};

// Check if a category exists
export const isCategoryValid = (categoryValue, type = 'expense') => {
  const categories = type === 'expense' ? expenseCategories : earningCategories;
  return categories.some(cat => cat.value === categoryValue);
};

// Get category by value
export const getCategoryByValue = (categoryValue, type = 'expense') => {
  const categories = type === 'expense' ? expenseCategories : earningCategories;
  return categories.find(cat => cat.value === categoryValue);
};
