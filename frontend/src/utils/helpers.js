// src/utils/helpers.js

// ✅ Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// ✅ Short text (for UI)
export const truncateText = (text, length = 20) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

// ✅ Check empty object
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};