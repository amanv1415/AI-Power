import React from 'react';
import { CATEGORIES } from '@/utils/constants';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onCategoryChange,
  onTypeChange,
}) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="space-y-4 mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field flex-1"
        />
        <button
          type="submit"
          className="btn-primary px-6"
        >
          Search
        </button>
      </form>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Category
          </label>
          <select
            onChange={(e) => onCategoryChange(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Type
          </label>
          <select
            onChange={(e) => onTypeChange(e.target.value)}
            className="input-field"
          >
            <option value="">All Types</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="podcast">Podcast</option>
          </select>
        </div>
      </div>
    </div>
  );
};
