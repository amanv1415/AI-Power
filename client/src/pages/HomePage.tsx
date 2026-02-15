import React, { useEffect } from 'react';
import { ContentCard } from '@/components/ContentCard';
import { useContentStore } from '@/store';
import { contentService } from '@/services/api';

export const HomePage: React.FC = () => {
  const { trendingContent, recommendations, setTrendingContent, setRecommendations, loading } =
    useContentStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, recs] = await Promise.all([
          contentService.getTrending(8),
          contentService.getRecommendations(6),
        ]);
        setTrendingContent(trending);
        setRecommendations(recs);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      }
    };

    fetchData();
  }, [setTrendingContent, setRecommendations]);

  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto container-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Media Hub
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              AI-powered platform for discovering, creating, and managing digital content. 
              Get personalized recommendations powered by advanced machine learning.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary text-lg px-8 py-3">
                Get Started
              </button>
              <button className="btn-secondary text-lg px-8 py-3">
                Learn More
              </button>
            </div>
          </div>
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-20 blur-3xl"></div>
              <div className="relative bg-white dark:bg-neutral-800 rounded-3xl p-8 space-y-4">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-6xl">
                  🎬
                </div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  AI-Powered Content Discovery
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Discover content tailored to your interests using advanced AI algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto container-padding">
        <div className="mb-8">
          <h2 className="font-display font-bold text-4xl text-neutral-900 dark:text-neutral-100 mb-2">
            Trending Now
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Discover the most popular content across all categories
          </p>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {trendingContent.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="max-w-7xl mx-auto container-padding">
          <div className="mb-8">
            <h2 className="font-display font-bold text-4xl text-neutral-900 dark:text-neutral-100 mb-2">
              Personalized for You
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Content recommended based on your interests
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="bg-neutral-100 dark:bg-neutral-800 py-16">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="font-display font-bold text-4xl text-center mb-12 text-neutral-900 dark:text-neutral-100">
            Powered by AI & ML
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'Smart Recommendations',
                description: 'Machine learning algorithms learn your preferences to suggest relevant content.',
              },
              {
                icon: '📊',
                title: 'Content Analysis',
                description: 'AI analyzes sentiment, topics, and engagement metrics of your content.',
              },
              {
                icon: '🔍',
                title: 'Advanced Search',
                description: 'Natural language processing powers intelligent search across all media.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="card p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
