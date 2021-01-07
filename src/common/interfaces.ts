export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  categories: string[];
}

export interface VideoListProps {
  videos: ProcessedVideo[]
}

export interface VideoContextType {
  isLoading: boolean;
  addVideo: (video: ProcessedVideo) => ProcessedVideo;
  addVideos: (videos: ProcessedVideo[]) => ProcessedVideo[];
  errorMessage: string;
  videos: ProcessedVideo[];
  lastId: number;
  updateVideo: (currentVideo: ProcessedVideo) => ProcessedVideo[];
  getVideo: (videoId: number) => ProcessedVideo | undefined;
}