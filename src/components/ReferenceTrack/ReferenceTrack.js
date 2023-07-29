//AIzaSyCBnH8gw26-8TqVvSVd5AbBm34gzgN1pLI
import React, { useState } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

const ReferenceTrackContainer = styled.div`
  font-family: 'Raleway', sans-serif;
  color: #525252;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchForm = styled.form`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px;
  background-color: #2339e9;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;

  :hover {
    background-color: #374ae7;
  }
`;

const SearchResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    width: 200px;
    height: auto;
    border-radius: 5px;
  }

  h3 {
    margin-top: 10px;
  }
`;

const VideoPlayerContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const PlaybackControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #2339e9;
    color: #fff;
    font-weight: bold;
    border: none;
    cursor: pointer;

    :hover {
      background-color: #374ae7;
    }
  }
`;

const ReferenceTrack = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [player, setPlayer] = useState(null);

  const handleSearch = async event => {
    event.preventDefault(); // Prevent form submission default behavior

    try {
      // Make an API request to search for videos using the YouTube API
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchQuery
        )}&key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error('Error searching for videos:', error);
    }
  };

  const handleVideoSelect = video => {
    setSelectedVideo(video);
  };

  const handlePlayerReady = event => {
    setPlayer(event.target);
  };

  const handlePlay = () => {
    player.playVideo();
  };

  const handlePause = () => {
    player.pauseVideo();
  };

  return (
    <ReferenceTrackContainer>
      <h2>Reference Track</h2>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput type="text" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Enter track name" />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>
      <SearchResultContainer>
        {searchResults.map(video => (
          <SearchResult key={video.id.videoId} onClick={() => handleVideoSelect(video)}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <h3>{video.snippet.title}</h3>
          </SearchResult>
        ))}
      </SearchResultContainer>
      {selectedVideo && (
        <VideoPlayerContainer>
          <YouTube videoId={selectedVideo.id.videoId} onReady={handlePlayerReady} />
          <PlaybackControls>
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
          </PlaybackControls>
        </VideoPlayerContainer>
      )}
    </ReferenceTrackContainer>
  );
};

export default ReferenceTrack;

