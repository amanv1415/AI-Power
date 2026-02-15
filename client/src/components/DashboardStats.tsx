import React from 'react';

interface StatItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
}

interface DashboardStatsProps {
  stats: StatItem[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`card p-6 bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/10 border border-${stat.color}-500/20`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
              {stat.trend && (
                <div className="text-xs mt-2 text-green-600 dark:text-green-400">
                  {stat.trend}
                </div>
              )}
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
