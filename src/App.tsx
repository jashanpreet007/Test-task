import React, { Component, useState, useEffect } from "react";
// import _ from "lodash";
// import YTSearch from "youtube-api-search";
import { API_KEY } from "./config";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import CommentSection from "./components/comment_section";
const YTSearch = require("youtube-api-search");

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    videoSearch("javascript");
  }, []);

  const videoSearch = (term: string) => {
    YTSearch({ key: API_KEY, term: term }, (videos: any) => {
      setVideos(videos);
      setSelectedVideo(videos[0]);
    });
  };

  return (
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={selectedVideo} />
      <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
      <CommentSection video={selectedVideo} />
    </div>
  );
};

export default App;
