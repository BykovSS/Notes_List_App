import React from 'react';
import {Route} from "react-router";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ViewList from '@material-ui/icons/ViewList';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Folder from '@material-ui/icons/Folder';
import Add from '@material-ui/icons/Add';

import TasksPageContainer from '../containers/TasksPage.jsx';

import './TasklistsPage.scss';

class TasklistsPage extends React.Component {

    render() {
        return (
            <div className='TasklistsPage'>
                <div className='TasklistsPage__menu'>
                    <List className='TasklistsPage__list'>
                        <h3 className='TasklistsPage__title'>Notes List App</h3>
                        <Divider />
                        <List className='TasklistsPage__list'>
                            <ListItem button
                                      onClick={this.props.onPushHistory.bind(null, `/lists`)}>
                                <ListItemIcon>
                                    <Home />
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                            <ListItem button
                                      onClick={this.props.onPushHistory.bind(null, `/about`)}>
                                <ListItemIcon>
                                    <ViewList />
                                </ListItemIcon>
                                <ListItemText primary="About"/>
                            </ListItem>
                        </List>
                        <Divider />
                        <List className='TasklistsPage__list' subheader={<ListSubheader component="div">Task Lists</ListSubheader>}>
                            {
                                this.props.taskLists.map(list =>
                                    <ListItem
                                        button
                                        selected={this.props.location.pathname.indexOf(list.id) != -1}
                                        key={list.id}
                                        onClick={this.props.onPushHistory.bind(null, `/lists/${list.id}`)}>
                                        <ListItemIcon>
                                            <Folder />
                                        </ListItemIcon>
                                        <ListItemText primary={list.name}/>
                                    </ListItem>
                                )
                            }
                            <ListItem button onClick={this.props.onAddTaskList}>
                                <ListItemIcon>
                                    <Add />
                                </ListItemIcon>
                                <ListItemText primary="Create new list"/>
                            </ListItem>
                        </List>
                        <Divider />
                        <List className='TasklistsPage__list'>
                            <ListItem button onClick={this.props.onLogOut}>
                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText primary="Log out"/>
                            </ListItem>
                        </List>
                    </List>
                </div>
                <div className='TasklistsPage__tasks'>
                    <Route path="/lists/:id" component={TasksPageContainer} />
                </div>
            </div>
        );
    }
}

export default TasklistsPage;
