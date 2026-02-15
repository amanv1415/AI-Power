import React from 'react';
import { ContentAnalysis } from '@/types';
import { SENTIMENT_COLORS } from '@/utils/constants';

interface ContentAnalysisProps {
  analysis: ContentAnalysis;
}

export const ContentAnalysisComponent: React.FC<ContentAnalysisProps> = ({ analysis }) => {
  return (
    <div className="card p-6 space-y-6">
      <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100">
        AI Analysis
      </h3>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Sentiment
          </span>
          <span
            className="px-4 py-2 rounded-full font-semibold text-white capitalize"
            style={{ backgroundColor: SENTIMENT_COLORS[analysis.sentiment] }}
          >
            {analysis.sentiment}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-3">
          Key Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          {analysis.topics.map((topic) => (
            <span
              key={topic}
              className="badge"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Keyword Score</p>
          <p className="font-bold text-2xl text-primary">{(analysis.keywordScore * 100).toFixed(0)}%</p>
        </div>
        <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Engagement</p>
          <p className="font-bold text-2xl text-secondary">{(analysis.engagement * 100).toFixed(0)}%</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-3">
          Recommendations
        </h4>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="text-primary font-bold">✓</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
