'use client';
import { useEffect, useState } from 'react';

export default function SearchBar({
  placeholder = 'Search...',
  delay = 500,
  onSearch
}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value.trim());
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, onSearch]);

  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className="sidebar-search"
    />
  );
}
