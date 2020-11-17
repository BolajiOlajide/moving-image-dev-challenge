import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/videos-table';
import { getVideos } from './services/videos';
import { Video } from './services/video.interface';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const handleVideosResponse = (videos: Video[]) => {
    setVideos(videos);
  };

  useEffect(() => {
    getVideos().then(handleVideosResponse);
  }, []);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Video Manager</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <VideosTable videos={videos} />
      </Container>
    </>
  );
};

export default App;
