/**
 * Utility module for form validation, data formatting, and common helpers
 * Exported as ES Module for use across the application
 */

/**
 * Validates an email address format
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a phone number (basic validation)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} True if phone number is valid, false otherwise
 */
export const validatePhone = (phone) => {
  // Accept formats with digits and common separators
  const phoneRegex = /^[\d\s\-+()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

/**
 * Validates a form field (name)
 * @param {string} name - The name to validate
 * @returns {boolean} True if name is valid (non-empty, at least 2 chars)
 */
export const validateName = (name) => {
  return name.trim().length >= 2;
};

/**
 * Formats a date to a readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - The text to escape
 * @returns {string} Escaped text
 */
export const escapeHtml = (text) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Validates all form fields and returns an object with validation results
 * @param {Object} formData - Object containing form data
 * @returns {Object} { isValid: boolean, errors: {field: message} }
 */
export const validateFormData = (formData) => {
  const errors = {};

  if (!validateName(formData.name)) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!formData.city) {
    errors.city = "Please select a city";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Stores user preference in localStorage
 * @param {string} key - The key to store
 * @param {string} value - The value to store
 */
export const saveUserPreference = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error("Failed to save preference:", e);
    return false;
  }
};

/**
 * Retrieves user preference from localStorage
 * @param {string} key - The key to retrieve
 * @returns {string|null} The stored value or null if not found
 */
export const getUserPreference = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error("Failed to retrieve preference:", e);
    return null;
  }
};

/**
 * Debounce function to limit function execution
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default {
  validateEmail,
  validatePhone,
  validateName,
  formatDate,
  escapeHtml,
  validateFormData,
  saveUserPreference,
  getUserPreference,
  debounce
};
