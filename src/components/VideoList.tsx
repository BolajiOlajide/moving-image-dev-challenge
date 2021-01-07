import React from 'react';
import { Link } from 'react-router-dom';

import type { VideoListProps } from '../common/interfaces';


const VideoList: React.FC<VideoListProps> = ({ videos }: VideoListProps) => {
  return (
    <table className="videos">
      <thead>
        <tr>
          <th>Video name</th>
          <th>Author</th>
          <th>Category name</th>
          <th>Highest quality format</th>
          <th>Release Date</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {videos.map(video => {
          return (
            <tr key={video.id}>
              <td>{video.name}</td>
              <td>{video.author}</td>
              <td>{video.categories.join(', ')}</td>
              <td>best 1080p</td>
              <td>19.10.2020</td>
              <td>
              <Link to={`/video/${video.id}/edit`} className="edit-vid-btn">Edit</Link>
              <a href={`/video/delete/${video.id}`} className="delete-vid-btn">Delete</a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};

export default VideoList;