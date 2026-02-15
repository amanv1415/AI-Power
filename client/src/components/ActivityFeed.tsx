import React from 'react';

interface Activity {
  id: string;
  type: 'view' | 'like' | 'save' | 'share';
  title: string;
  timestamp: string;
  icon: string;
}

interface ActivityFeedProps {
  activities?: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const defaultActivities: Activity[] = [
    {
      id: '1',
      type: 'view',
      title: 'Watched "The Future of AI in 2026"',
      timestamp: '2 hours ago',
      icon: '👁️',
    },
    {
      id: '2',
      type: 'like',
      title: 'Liked "Web Development Best Practices"',
      timestamp: '5 hours ago',
      icon: '❤️',
    },
    {
      id: '3',
      type: 'save',
      title: 'Saved "Quantum Computing Explained"',
      timestamp: '1 day ago',
      icon: '📌',
    },
    {
      id: '4',
      type: 'view',
      title: 'Watched "Deep Sea Documentary"',
      timestamp: '2 days ago',
      icon: '👁️',
    },
    {
      id: '5',
      type: 'share',
      title: 'Shared "Music Production Tips"',
      timestamp: '3 days ago',
      icon: '🔗',
    },
  ];

  const displayActivities = activities || defaultActivities;

  return (
    <div className="card p-6">
      <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-4">
        ⚡ Recent Activity
      </h3>
      <div className="space-y-3">
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 pb-3 border-b border-neutral-200 dark:border-neutral-700 last:border-0"
          >
            <div className="text-2xl mt-1">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {activity.title}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 px-4 py-2 text-primary font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
        View All Activity
      </button>
    </div>
  );
};
