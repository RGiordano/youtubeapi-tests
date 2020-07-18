import React from "react";

class StatsModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            tags: [],
        };
        this.updateTopics = this.updateTopics.bind(this);
    }

    componentDidMount() {
        this.updateTopics();
        this.updateTags();
    }

    updateTopics() {
        const { videos } = this.props;

        let topics = {};
        videos.forEach((video) => {
            const categories = video.topicDetails?.topicCategories ?? []
            categories.forEach((category) => {
                topics[category] = topics[category] ? topics[category] + 1 : 1;
            });
        });
        topics = Object.keys(topics).map((topic) => {
            const topicName = topic.replace("https://en.wikipedia.org/wiki/", "");
            return {
                name: topicName,
                url: topic,
                value: topics[topic],
            }
        }).sort((a, b) => b.value - a.value);

        this.setState({
            topics: topics
        });
    }

    updateTags() {
        const { videos } = this.props;
        let tags = [];
        videos.forEach((video) => {
            const rawTags = video.snippet?.tags ?? []
            rawTags.forEach((tag) => {
                tags[tag] = tags[tag] ? tags[tag] + 1 : 1;
            });
        });
        tags = this.filterMoreThan(tags, 3);
        tags = Object.keys(tags).map((tag) => {
            return {
                name: tag,
                value: tags[tag],
            }
        }).sort((a, b) => b.value - a.value);

        this.setState({
            tags: tags
        });
    }

    filterMoreThan(items, minimum) {
        let newItems = [];
        Object.keys(items).forEach((itemKey) => {
            if (items[itemKey] >= minimum) {
                newItems[itemKey] = items[itemKey];
            }
        });
        return newItems;
    }

    render() {
        const topics = this.state.topics.map((topic) => {
            return (
                <li key={topic.name}>
                    <a href={topic.url} rel={"noopener noreferrer"} target={"_blank"}>{topic.name} ({topic.value})</a>
                </li>
            );
        });
        const tags = this.state.tags.map((tag) => {
            return (
                <li key={tag.name}>
                    {tag.name} ({tag.value})
                </li>
            );
        });
        return (
            <div style={{display: "flex"}}>
                <div className={"ranking"}>
                    <h3>Topics Rank</h3>
                    <ul>{topics}</ul>
                </div>
                <div className={"ranking"}>
                    <h3>Tags Rank</h3>
                    <ul>{tags}</ul>
                </div>
            </div>
        );
    }
}

export default StatsModal;