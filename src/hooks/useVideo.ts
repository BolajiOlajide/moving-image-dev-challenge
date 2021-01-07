import { useState, useEffect } from 'react';

import type { ProcessedVideo, VideoContextType } from '../common/interfaces';
import { getVideos } from '../services/videos';


const useVideo = (): VideoContextType => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [lastId, setLastId] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);

    getVideos()
      .then((videos) => setVideos(videos))
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setLastId(videos[videos.length - 1]?.id || 0);
  }, [videos])

  const addVideo = (video: ProcessedVideo): ProcessedVideo => {
    setVideos((currentVideos: ProcessedVideo[]) => {
      return [...currentVideos, video]
    });

    return video;
  }

  const addVideos = (videos: ProcessedVideo[]): ProcessedVideo[] => {
    setVideos((currentVideos: ProcessedVideo[]) => {
      return [...currentVideos, ...videos];
    });

    return videos;
  };

  return { addVideo, videos, addVideos, isLoading, errorMessage, lastId };
};

export default useVideo;
