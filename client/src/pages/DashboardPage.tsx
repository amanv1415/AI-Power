import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useContentStore } from '@/store';
import { contentService } from '@/services/api';
import { ContentCard } from '@/components/ContentCard';
import { CATEGORIES } from '@/utils/constants';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { recommendations, setRecommendations } = useContentStore();
  const [stats, setStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    contentSaved: 0,
    hoursWatched: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recs = await contentService.getRecommendations(6);
        setRecommendations(recs);
        
        // Calculate stats
        const totalViews = recs.reduce((sum, item) => sum + (item.views || 0), 0);
        const totalLikes = recs.reduce((sum, item) => sum + (item.likes || 0), 0);
        setStats({
          totalViews,
          totalLikes,
          contentSaved: Math.floor(Math.random() * 20) + 5,
          hoursWatched: Math.floor(Math.random() * 100) + 10,
        });
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [setRecommendations]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto container-padding py-12">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-display font-bold text-4xl mb-2 text-neutral-900 dark:text-neutral-100">
              Welcome, {user.username}! 👋
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Your personalized content hub
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats.totalViews.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Views</div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {stats.totalLikes.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Likes Received</div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {stats.contentSaved}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Saved Items</div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {stats.hoursWatched}h
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Hours Watched</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Recommendations */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              ✨ Your Recommendations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.slice(0, 6).length > 0 ? (
                recommendations.slice(0, 6).map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))
              ) : (
                <p className="col-span-full text-center py-12 text-neutral-600 dark:text-neutral-400">
                  No recommendations yet. Explore content to get started!
                </p>
              )}
            </div>
          </div>

          {/* Continue Watching */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              ▶️ Continue Watching
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.slice(3, 5).map((item) => (
                <div key={item.id} className="card p-4 flex gap-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <img
                    src={item.thumbnail || 'https://via.placeholder.com/100x100?text=Video'}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                      {item.title}
                    </h3>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1 rounded-full mt-2 mb-2">
                      <div className="bg-blue-500 h-1 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">65% watched</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="card p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {user.username}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {user.email}
              </p>
            </div>
            <button
              onClick={() => navigate('/explore')}
              className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors mb-3"
            >
              Explore More
            </button>
            <button className="w-full px-4 py-2 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white rounded-lg transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Preferences */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-4">
              ⚙️ Preferences
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 block mb-2">
                  Theme
                </label>
                <select className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white">
                  <option>Dark</option>
                  <option>Light</option>
                  <option>Auto</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 block mb-2">
                  Favorite Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 4).map((cat) => (
                    <button
                      key={cat}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium hover:bg-primary/30 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer mt-4">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Enable AI Recommendations
                </span>
              </label>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-4">
              📚 Quick Links
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-sm">
                📌 My Favorites
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-sm">
                🔖 Watch Later
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-sm">
                📊 My Analytics
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-sm">
                ⚡ Activity
              </button>
            </div>
          </div>

          {/* Trending Now */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-4">
              🔥 Trending Now
            </h3>
            <div className="space-y-3">
              {recommendations.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <span className="text-lg font-bold text-primary">#{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.views?.toLocaleString() || 0} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
