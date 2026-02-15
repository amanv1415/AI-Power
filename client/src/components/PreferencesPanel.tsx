import React, { useState } from 'react';
import { CATEGORIES } from '@/utils/constants';

export const PreferencesPanel: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Technology',
    'Entertainment',
  ]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = () => {
    console.log('Preferences saved:', {
      theme,
      aiRecommendations,
      selectedCategories,
      notificationsEnabled,
    });
    // Here you would typically save to backend
  };

  return (
    <div className="card p-6 space-y-6">
      <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
        ⚙️ Preferences
      </h3>

      {/* Theme Selection */}
      <div>
        <label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 block mb-3">
          Theme
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Light', 'Dark', 'Auto'].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t.toLowerCase())}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                theme === t.toLowerCase()
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 block mb-3">
          Favorite Categories
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategories.includes(cat)
                  ? 'bg-primary text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={aiRecommendations}
            onChange={(e) => setAiRecommendations(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm text-neutral-900 dark:text-neutral-100">
            Enable AI Recommendations
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm text-neutral-900 dark:text-neutral-100">
            Enable Notifications
          </span>
        </label>
      </div>

      <button
        onClick={handleSave}
        className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
      >
        Save Preferences
      </button>
    </div>
  );
};
