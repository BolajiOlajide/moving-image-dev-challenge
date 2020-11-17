import { Video } from './video.interface';
import { getCategories } from './categories';
import { getAuthors } from './authors';

export const getVideos = (): Promise<Video[]> => {
  return Promise.all([getCategories(), getAuthors()])
    .then(([categories, authors]) => {
    // TODO: implement here
    return [];
  });
};
