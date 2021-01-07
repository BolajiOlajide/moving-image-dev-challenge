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

  const getVideo = (videoId: number): ProcessedVideo | undefined => {
    return videos
      .find(video => video.id === videoId);
  }

  const updateVideo = (currentVideo: ProcessedVideo): ProcessedVideo[] => {
    const updatedVideos = videos.map((video) => {
      if (video.id === currentVideo.id) {
        return currentVideo;
      }

      return video;
    });

    setVideos(updatedVideos);
    return updatedVideos;
  }

  const deleteVideo = (videoId: number): void => {
    const updatedVideos = videos.filter((video) => video.id !== videoId);

    setVideos(updatedVideos)
  }

  return { addVideo, videos, addVideos, isLoading, errorMessage, lastId, updateVideo, getVideo, deleteVideo };
};

export default useVideo;
