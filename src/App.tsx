import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/home';
import VideoContext from './context/VideoContext';
import useVideo from './hooks/useVideo';
import { VideoContextType } from './common/interfaces';

const App: React.FC = () => {
  const videos: VideoContextType = useVideo();

  return (
    <VideoContext.Provider value={videos}>
      <Router>
        <Header />

        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </VideoContext.Provider>
  )
};

export default App;