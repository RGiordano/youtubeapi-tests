import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import {Box, Button, Modal, Typography} from "@material-ui/core";
import CategoryList from "./CategoryList";
import VideoList from "./VideoList";
import YouTubeIcon from '@material-ui/icons/YouTube';
import StatsModal from "./StatsModal";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            videos: [],
            selectedCategoryId: null,
            open: false,
        };

        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchVideos = this.fetchVideos.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.rootRef = React.createRef(null);
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        axios.get('http://localhost:5000/categories').then(res => {
            const { items } = res.data;
            this.setState({ categories: items, selectedCategoryId: null })
        }).catch(() => {
            console.log('Error trying to get data from YouTube API')
        });
    }

    fetchVideos(categoryId) {
        axios.get(`http://localhost:5000/categories/${categoryId}/videos`).then(res => {
            const { items } = res.data;
            this.setState({ videos: items })
        }).catch(() => {
            console.log('Error trying to get data from YouTube API')
        });
    }

    changeCategory(id) {
        this.setState({ selectedCategoryId: id });
        this.fetchVideos(id);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        let modalButton = null;
        if (this.state.videos?.length) {
            modalButton = (
                <Button style={{marginBottom: "5px", marginLeft: "5px"}} variant="contained" color="primary" onClick={this.handleOpen}>
                    Show Category Stats
                </Button>
            );
        }
        return (
            <Container>
                <Box my={2}>
                    <Typography variant="h4" component="h1" color={"primary"} gutterBottom>
                        <YouTubeIcon /> YouTube API Tests
                    </Typography>
                    <hr />
                </Box>
                <Box display="flex">
                    <Box width={1/4}>
                        <CategoryList
                            onCategoryClicked={this.changeCategory}
                            categories={this.state.categories}
                            selectedCategoryId={this.state.selectedCategoryId}
                        />
                    </Box>
                    <Box width={3/4} my={1} px={1}>
                        {modalButton}
                        <VideoList videos={this.state.videos} />
                    </Box>
                </Box>
                <div ref={this.rootRef}>
                    <Modal
                        disablePortal
                        disableEnforceFocus
                        open={this.state.open}
                        onClose={this.handleClose}
                        container={() => this.rootRef.current}
                        className={"modal"}
                    >
                        <div className={"modal-content"}>
                            <StatsModal videos={this.state.videos} />
                        </div>
                    </Modal>
                </div>
            </Container>
        );
    }
}

export default App;
