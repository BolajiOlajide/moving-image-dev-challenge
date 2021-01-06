import React, { useEffect, useState } from 'react';

import type { ProcessedVideo } from '../common/interfaces';
import { getVideos } from '../services/videos';
import Layout from '../components/Layout';

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
    </Layout>
  );
};

export default Home;
