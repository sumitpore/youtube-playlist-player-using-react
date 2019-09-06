import React from 'react';
import StyledPlaylistItem from './styles/StyledPlaylistItem';
import { Link } from 'react-router-dom'

const PlaylistItem = ({ video, active, played }) => (
  <StyledPlaylistItem active={active} played={played}>
    <div className="wbn-player__video-nr">{video.num}</div>
    <div className="wbn-player__video-name">
      <Link to={{ pathname: `/${video.id}`, autoplay: true}}>
          {video.title}
      </Link></div>
    <div className="wbn-player__video-time">{video.duration}</div>
  </StyledPlaylistItem>
);

export default PlaylistItem;