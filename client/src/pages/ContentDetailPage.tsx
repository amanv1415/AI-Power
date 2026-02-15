import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { contentService } from '@/services/api';
import { ContentAnalysisComponent } from '@/components/ContentAnalysis';
import { MediaItem } from '@/types';

export const ContentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [content, setContent] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      try {
        const data = await contentService.getById(id);
        setContent(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch content:', error);
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleLike = async () => {
    if (!id) return;
    try {
      await contentService.like(id);
      setLiked(!liked);
      if (content) {
        setContent({
          ...content,
          likes: liked ? content.likes - 1 : content.likes + 1,
        });
      }
    } catch (error) {
      console.error('Failed to like content:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto container-padding py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-neutral-200 dark:bg-neutral-700 rounded-xl"></div>
          <div className="h-32 bg-neutral-200 dark:bg-neutral-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="max-w-7xl mx-auto container-padding py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
          Content Not Found
        </h1>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto container-padding py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-primary hover:opacity-80 transition-opacity"
      >
        ← Back
      </button>

      <div className="card overflow-hidden mb-8">
        {content.thumbnail && (
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-96 object-cover"
          />
        )}
      </div>

      <div className="space-y-8">
        {/* Title and Meta */}
        <div>
          <h1 className="font-display font-bold text-4xl mb-4 text-neutral-900 dark:text-neutral-100">
            {content.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge">{content.category}</span>
            <span className="badge">{content.type}</span>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {content.description}
          </p>
        </div>

        {/* Stats and Actions */}
        <div className="card p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-1">
                {content.views.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Views</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary mb-1">
                {content.likes.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Likes</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(content.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLike}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                liked
                  ? 'bg-red-500 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
              }`}
            >
              {liked ? '❤️ Liked' : '🤍 Like'}
            </button>
          )}
        </div>

        {/* Tags */}
        {content.tags.length > 0 && (
          <div className="card p-6">
            <h3 className="font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Analysis */}
        {content.aiAnalysis && (
          <ContentAnalysisComponent analysis={content.aiAnalysis} />
        )}
      </div>
    </div>
  );
};
