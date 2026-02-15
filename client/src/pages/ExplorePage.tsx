import React, { useState } from 'react';
import { SearchFilters } from '@/components/SearchFilters';
import { ContentCard } from '@/components/ContentCard';
import { useContentStore } from '@/store';
import { contentService } from '@/services/api';

export const ExplorePage: React.FC = () => {
  const { searchResults, loading, setSearchResults } = useContentStore();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = async (query: string) => {
    try {
      const results = await contentService.search(query, {
        category: selectedCategory || undefined,
        type: selectedType || undefined,
      });
      setSearchResults(results.results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    if (category) {
      try {
        const results = await contentService.getByCategory(category);
        setSearchResults(results);
      } catch (error) {
        console.error('Failed to fetch category:', error);
      }
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="max-w-7xl mx-auto container-padding py-12">
      <div className="mb-12">
        <h1 className="font-display font-bold text-4xl mb-2 text-neutral-900 dark:text-neutral-100">
          Explore Content
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover amazing media, articles, and more
        </p>
      </div>

      <SearchFilters
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
      />

      {loading ? (
        <div className="grid md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card h-96 animate-pulse"></div>
          ))}
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-6">
          {searchResults.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            No content found. Try different search criteria.
          </p>
        </div>
      )}
    </div>
  );
};
