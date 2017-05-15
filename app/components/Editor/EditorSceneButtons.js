import React, { Component } from 'react';

class EditorSceneButtons extends Component {
  render() {
    return (
      <div className="editor-row">

        <div className="editor-btns-left-align btn-group">

          <button
            className="editor-btn btn btn-default"
            onClick={this.props.onBold}
          >
            <i className="fa fa-bold" />
          </button>
          <button
            className="editor-btn btn btn-default"
            onClick={this.props.onItalic}
          >
            <i className="fa fa-italic" />
          </button>
          <button
            className="editor-btn btn btn-default"
            onClick={this.props.onBlockQuote}
          >
            <i className="fa fa-quote-right" />
          </button>
          <button
            className="editor-btn btn btn-default"
            onClick={this.props.onUnorderedList}
          >
            <i className="fa fa-list-ul" />
          </button>
          <button
            className="editor-btn btn btn-default"
            onClick={this.props.onOrderedList}
          >
            <i className="fa fa-list-ol" />
          </button>
          <button
            className="editor-btn btn btn-default"
            onClick={this.props.onAddImage}
          >
            <i className="fa fa-file-image-o" />
          </button>

        </div>

        <div className="editor-btns-right-align btn-group">

          <button
            className="btn btn-default module-btn"
            onClick={this.props.onToggleModule.bind(this, 'actors')}
          >
            Actors &nbsp; <span className="glyphicon glyphicon-user"></span>
          </button>

          <button
            className="btn btn-default module-btn"
            onClick={this.props.onToggleModule.bind(this, 'maps')}
          >
            Map &nbsp; <span className="glyphicon glyphicon-globe"></span>
          </button>

          <button
            className="btn btn-default module-btn"
            onClick={this.props.onToggleModule.bind(this, 'hero')}
          >
            Hero &nbsp; <span className="glyphicon glyphicon-picture"></span>
          </button>

        </div>

      </div>
    )
  }
}

/* ----- CONTAINER ----- */

import { connect } from 'react-redux';
import $ from 'jquery';
import { deselectModule, showModule } from '../../reducers/editor';

const mapDispatchToProps = (dispatch, ownProps) => ({
	onToggleModule(module, event) {
		event.preventDefault();
		if (ownProps.whichModule === module) {
			$(`#editorscene-wrapper-${ownProps.whichScene}`).removeClass('toggled');
			dispatch(deselectModule(ownProps.whichScene));
		} else {
			$(`#editorscene-wrapper-${ownProps.whichScene}`).addClass('toggled');
			dispatch(showModule(module));
		}
	}
});

export default connect(null, mapDispatchToProps)(EditorSceneButtons);
