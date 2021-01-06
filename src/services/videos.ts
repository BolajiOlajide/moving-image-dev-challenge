import { getCategories } from './categories';
import { getAuthors } from './authors';
import type { ProcessedVideo, Video } from '../common/interfaces';

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise
    .all([getCategories(),getAuthors()])
    .then(([categories, authors]) => {
      const videos: ProcessedVideo[] = [];

      const getCategoryById = (categoryId: number): string => {
        const foundCategory = categories
          .find(category => category.id === categoryId);
        return foundCategory?.name || '';
      };

      authors.forEach((author) => {
        const processedVideos: ProcessedVideo[] = author.videos.map((video: Video) => {
          const processedVideo: ProcessedVideo = {
            id: video.id,
            author: author.name,
            categories: video.catIds.map(getCategoryById),
            name: video.name
          };

          return processedVideo;
        })
        videos.push(...processedVideos);
      });

      return videos;
  });
};
