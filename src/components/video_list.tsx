import React from "react";
import VideoListItem from "./video_list_item";

interface Props{
  videos:Array<string>,
  onVideoSelect:Function

}
const VideoList = ({videos,onVideoSelect}:Props) => {
  const videoItems = videos.map((video:any) => {
    return (
      <VideoListItem
        onVideoSelect={onVideoSelect}
        key={video.etag}
        video={video}
      />
    );
  });
  return <ul className="col-md-4 list-group">{videoItems}</ul>;
};

export default VideoList;
