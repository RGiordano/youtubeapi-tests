import React from 'react';
import Video from "./Video";

class VideoList extends React.Component {
    render() {
        const { videos } = this.props;
        const listVideos = videos.map((video) =>
            <Video style={{width: "300px"}} video={video} key={video.id}></Video>
        );
        if (!listVideos.length) {
            return (
                <div>Please, select one category</div>
            );
        }
        return (
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {listVideos}
            </div>
        );
    }
}

export default VideoList;