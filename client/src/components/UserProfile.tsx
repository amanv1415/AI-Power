import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  username: string;
  email: string;
  avatar?: string;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  username,
  email,
  avatar,
  onLogout,
}) => {
  const navigate = useNavigate();

  const getInitial = (str: string) => str.charAt(0).toUpperCase();

  return (
    <div className="card p-6 bg-gradient-to-br from-primary/10 to-secondary/10 sticky top-8">
      <div className="text-center mb-6">
        {avatar ? (
          <img
            src={avatar}
            alt={username}
            className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
            {getInitial(username)}
          </div>
        )}
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          {username}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 break-all">
          {email}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
          Member since Feb 2026
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => navigate('/explore')}
          className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
        >
          🔍 Explore Content
        </button>
        <button className="w-full px-4 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-lg transition-colors font-medium">
          ⚙️ Settings
        </button>
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
        >
          🚪 Sign Out
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Favorites</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">8</div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};
