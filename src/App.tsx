import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/home';
import AddVideo from './pages/add-video';
import About from './pages/about';
import Faq from './pages/faq';

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
          <Route path="/add-video">
            <AddVideo />
          </Route>

          <Route path="/faq">
            <Faq />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </VideoContext.Provider>
  )
};

export default App;