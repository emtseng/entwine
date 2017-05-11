import React, { Component } from 'react';

import EditorScene from './EditorScene';

/* ----- COMPONENT ----- */

class Editor extends Component {
  render() {
    return (
      <div id="storyEditor">
        <div className="row titleRow">
          <div className="col-md-6">
            <input
              name="storyTitle"
              className="story-title-input"
              type="text"
              placeholder="Title your story"
              onChange={this.props.onStoryTitleChange}
              value={this.props.storyTitle}
            />
          </div>
          <div className="col-md-3 addScene">
            <button
              className="btn btn-success"
              onClick={this.props.onAddScene}
            >
              Add Scene
                </button>
          </div>
          <div className="col-md-3 publish-button">
            <button
              className="btn btn-success"
              onClick={this.props.onSubmitStory}
            >
              Publish My Story  <span className="glyphicon glyphicon-share"></span>
            </button>
          </div>
      </div>
        {
          this.props.editor.scenes.length ? (this.props.editor.scenes.map(scene => (
            <EditorScene
              position={scene.position}
              key={scene.key}
            />
          )))
            : null
        }
      </div>
    );
  }
}

/* ----- CONTAINER ----- */

import { connect } from 'react-redux';
import { addScene, changeStoryTitle, submitStory } from '../reducers/editor';

const mapStateToProps = store => ({
  editor: store.editor,
  storyTitle: store.editor.title,
});

const mapDispatchToProps = dispatch => ({
  onAddScene(event) {
    event.preventDefault();
    dispatch(addScene());
  },
  onStoryTitleChange(event) {
    event.preventDefault();
    dispatch(changeStoryTitle(event.target.value));
  },
  onSubmitStory(event) {
    event.preventDefault();
    dispatch(submitStory());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
