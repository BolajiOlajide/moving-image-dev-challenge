import React, { useContext, useState } from 'react';

import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import VideoList from '../components/VideoList';
import VideoContext from '../context/VideoContext';
import { ProcessedVideo, VideoContextType } from '../common/interfaces';


const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { videos, isLoading } = useContext<VideoContextType>(VideoContext);
  const [filteredVideos, setFilteredVideos] = useState<ProcessedVideo[]>([]);
  const [showFilteredVideos, setShowFilteredVideos] = useState<boolean>(false);

  const filterVideos = () => {
    setFilteredVideos(videos.filter(video => video.name.toLowerCase().includes(searchTerm.toLowerCase())));
    setShowFilteredVideos(true);
  }

  const resetSearch = () => {
    setFilteredVideos([]);
    setShowFilteredVideos(false);
    setSearchTerm('');
  }

  return (
    <Layout>
      <h2>VManager Demo v0.0.1</h2>

      <section className="searchForm">
        <input name="search" value={searchTerm} onChange={({ target }) => setSearchTerm(target.value)} className="search-input" />
        <button className="search-btn" onClick={filterVideos}>Search</button>
        <button className="reset-btn" onClick={resetSearch}>Reset</button>
      </section>

      { isLoading ? <Spinner /> : <VideoList videos={showFilteredVideos ? filteredVideos : videos} />}
    </Layout>
  );
};

export default Home;
