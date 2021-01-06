import React from 'react';

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
              <a href={`/video/edit/${video.id}`} className="edit-vid-btn">Edit</a>
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