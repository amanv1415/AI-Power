import React from 'react';
import { MediaItem } from '@/types';

interface WatchlistSectionProps {
  items?: MediaItem[];
  onRemove?: (itemId: string) => void;
  onPlay?: (itemId: string) => void;
}

export const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  items,
  onRemove,
  onPlay,
}) => {
  const defaultItems: MediaItem[] = [
    {
      id: '1',
      title: 'Advanced TypeScript Patterns',
      description: 'Learn advanced TypeScript patterns and practices',
      type: 'article',
      url: 'https://example.com/ts-patterns',
      thumbnail: 'https://via.placeholder.com/300x200?text=TypeScript',
      views: 5420,
      likes: 342,
      tags: ['typescript', 'programming'],
      category: 'Technology',
      createdAt: '2026-02-10',
      updatedAt: '2026-02-10',
    },
    {
      id: '2',
      title: 'React Hooks Deep Dive',
      description: 'Master React hooks and custom hook patterns',
      type: 'video',
      url: 'https://example.com/react-hooks',
      thumbnail: 'https://via.placeholder.com/300x200?text=React',
      views: 8923,
      likes: 645,
      tags: ['react', 'javascript', 'hooks'],
      category: 'Technology',
      createdAt: '2026-02-09',
      updatedAt: '2026-02-09',
    },
  ];

  const displayItems = items || defaultItems;

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
          📖 My Watchlist
        </h3>
        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
          {displayItems.length} items
        </span>
      </div>

      {displayItems.length > 0 ? (
        <div className="space-y-3">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group"
            >
              <img
                src={item.thumbnail || 'https://via.placeholder.com/60x60?text=Item'}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.category} • {item.type}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onPlay?.(item.id)}
                  className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-colors"
                  title="Play"
                >
                  ▶️
                </button>
                <button
                  onClick={() => onRemove?.(item.id)}
                  className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-6 text-neutral-500 dark:text-neutral-400 text-sm">
          Your watchlist is empty
        </p>
      )}
    </div>
  );
};
