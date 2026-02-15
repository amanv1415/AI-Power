import React from 'react';
import { MediaItem } from '@/types';

interface TrendingSectionProps {
  items?: MediaItem[];
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ items = [] }) => {
  return (
    <div className="card p-6">
      <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-4">
        🔥 Trending Now
      </h3>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.slice(0, 5).map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-3 cursor-pointer p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors group"
            >
              <div className="flex-shrink-0">
                <span className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {idx + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  <span>👁️ {(item.views || 0).toLocaleString()}</span>
                  <span>❤️ {(item.likes || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-6 text-neutral-500 dark:text-neutral-400 text-sm">
          No trending content available
        </p>
      )}

      <button className="w-full mt-4 px-4 py-2 text-primary font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
        Explore Trending
      </button>
    </div>
  );
};
