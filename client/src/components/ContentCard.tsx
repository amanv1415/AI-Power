import React from 'react';
import { MediaItem } from '@/types';
import { SENTIMENT_COLORS } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';

interface ContentCardProps {
  item: MediaItem;
  onClick?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ item, onClick }) => {
  const navigate = useNavigate();
  const sentiment = item.aiAnalysis?.sentiment || 'neutral';

  const handleClick = () => {
    if (onClick) onClick();
    navigate(`/content/${item.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="card overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
    >
      <div className="relative overflow-hidden h-48 bg-neutral-200 dark:bg-neutral-700">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <span className="text-4xl">📷</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          {item.aiAnalysis && (
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: SENTIMENT_COLORS[sentiment] }}
            >
              {sentiment}
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
            {item.type}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2 text-neutral-900 dark:text-neutral-100">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 rounded text-xs bg-primary/10 text-primary dark:text-primary"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              👁️ {item.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              ❤️ {item.likes.toLocaleString()}
            </span>
          </div>
          <span className="text-xs">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
