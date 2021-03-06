import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import StoriesList from './components/Views/StoriesList';
import NotFound from './components/NotFound';

import Editor from './components/Editor/Editor';
import ViewStory from './components/Views/ViewStory';

/* -----------------    COMPONENT     ------------------ */

const Routes = (props) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={props.fetchInitialData}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="stories/:storyId" component={ViewStory} onEnter={props.onRealStoryEnter} />
      <Route path="editor" component={Editor} />
      <Route path="stories" component={StoriesList} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

import { fetchFakeStory, fetchStory } from './reducers/displayState';
import { fetchStories } from './reducers/stories';

const mapProps = null;

const mapDispatch = dispatch => ({
  onFakeStoryEnter: () => {
    dispatch(fetchFakeStory());
  },
  onRealStoryEnter: (nextRouterState) => {
    const storyId = nextRouterState.params.storyId;
    dispatch(fetchStory(storyId));
  },
  fetchInitialData: () => {
    dispatch(fetchStories());
  }
});

export default connect(mapProps, mapDispatch)(Routes);
