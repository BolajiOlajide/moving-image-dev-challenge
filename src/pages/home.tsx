import React, { useEffect, useState } from 'react';

import type { ProcessedVideo } from '../common/interfaces';
import { getVideos } from '../services/videos';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import VideoList from '../components/VideoList';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getVideos()
      .then((videos) => {
        setVideos(videos);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <Layout>
      <h2>VManager Demo v0.0.1</h2>

      { isLoading ? <Spinner /> : <VideoList videos={videos} />}
    </Layout>
  );
};

export default Home;
