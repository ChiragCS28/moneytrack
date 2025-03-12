/**
 * Utility functions for shadcn UI components
 */

/**
 * Combines multiple class names into a single string
 * @param {string[]} inputs - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Format a date to a readable string
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format currency in INR
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
