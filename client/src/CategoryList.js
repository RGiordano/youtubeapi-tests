import React from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";

class CategoryList extends React.Component {

    render() {
        const { categories } = this.props
        const listCategories = categories.map((category) =>
            <ListItem
                button
                selected={this.props.selectedCategoryId === category.id}
                onClick={() => this.props.onCategoryClicked(category.id)}
                key={category.id}
            >
                <ListItemText primary={category.title} />
            </ListItem>
        )

        if (!listCategories.length) {
            return (
                <div>Loading categories list...</div>
            )
        }

        return (
            <List component="nav">
                {listCategories}
            </List>
        );
    }
}

export default CategoryList;
