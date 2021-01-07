import React, { useState } from 'react';

import type { DeleteBtnProps } from '../common/interfaces';


const DeleteBtn: React.FC<DeleteBtnProps> = (props: DeleteBtnProps) => {
  const { deleteVideoFn, videoId } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const actuallyDeleteVideo = (shouldDelete: boolean) => {
    if (shouldDelete) {
      deleteVideoFn();
    }
  }

  const toggleTooltip = () => setShowTooltip(shouldShow => !shouldShow);
  const visibility = showTooltip ? 'visible' : 'hidden';
  const opacity = showTooltip ? 1 : 0;

  return (
    <div onClick={toggleTooltip} className="delete-vid-btn tooltip">
      Delete

      <div className="tooltipChild" style={{ visibility, opacity }}>
        Are you sure you want to delete the video with ID: {videoId}

        <button onClick={() => actuallyDeleteVideo(true)}>
          Yes
        </button>

        <button onClick={() => actuallyDeleteVideo(false)}>
          No
        </button>
      </div>
    </div>
  )
};

export default DeleteBtn;