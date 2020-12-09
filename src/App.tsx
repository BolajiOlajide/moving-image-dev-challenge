import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/videos-table';
import { getVideos } from './services/videos';
import { ProcessedVideo } from './common/interfaces';

const App: React.FC = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    getVideos()
      .then((videos) => {
        setVideos(videos);
      });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <VideosTable videos={videos} />
      </Container>
    </>
  );
};

export default App;
