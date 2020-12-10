import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo } from '../common/interfaces';

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise
    .all([getCategories(),getAuthors()])
    .then(([categories, authors]) => {
    // TODO: implement
    return [];
  });
};
