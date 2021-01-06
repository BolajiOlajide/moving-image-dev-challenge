import React, { useEffect, useState } from 'react';

import type { ProcessedVideo } from '../common/interfaces';
import { getVideos } from '../services/videos';

const Home: React.FC = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    getVideos()
      .then((videos) => {
        console.log(videos)
        setVideos(videos);
      });
  }, []);

  return (
    <main>
      <p>Show Videos</p>
    </main>
  );
};

export default Home;
