import React from 'react';

class Video extends React.Component {
    render() {
        const video = this.props.video;
        return (
            <div className={"video-item"}>
                <img
                    src={video.snippet?.thumbnails?.high?.url}
                    style={{maxWidth: "100%", height: "auto"}}
                    alt={video.snippet?.localized?.title}
                />
                <h4>{video.snippet?.localized?.title}</h4>
            </div>
        )
    }
}

export default Video;