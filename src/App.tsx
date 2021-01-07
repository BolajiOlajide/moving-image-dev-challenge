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
import EditVideo from './pages/edit-video';
import Faq from './pages/faq';

import VideoContext from './context/VideoContext';
import useVideo from './hooks/useVideo';
import { VideoContextType } from './common/interfaces';

const App: React.FC = () => {
  const videoHook: VideoContextType = useVideo();

  return (
    <VideoContext.Provider value={videoHook}>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/add-video">
            <AddVideo />
          </Route>

          <Route exact path="/video/:videoId/edit">
            <EditVideo />
          </Route>

          <Route exact path="/faq">
            <Faq />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </VideoContext.Provider>
  )
};

export default App;