import React, { Component } from 'react';

/* ----- COMPONENT ----- */

class Scene extends Component {

  setInnerHTML(html) {
    return { __html: html }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-4">
            <div className="article-titles">
              <h1 className="article-font col-md-offset-1">
                {this.props.storyTitle} >> {this.props.currScene.title}
              </h1>
            </div>
            <div
              className="article-text article-font col-md-offset-1"
              dangerouslySetInnerHTML={this.setInnerHTML(this.props.html)}
            />
          </div>

          <div className="col-md-8 pull-right actorsBlock">
            {this.props.actors ? <h3 className="actors-heading article-font">Actors</h3> : null}
            {this.props.actors ?
              this.props.actors.map(actor => (
                <div key={actor.name}>
                  <img className="img-responsive img-circle actors-display" src={actor.image} />
                  <h5 className="article-font">{actor.name}</h5>
                  <p>{actor.description}</p>
                </div>
              ))
              : null}
          </div>

        </div>


      </div>
    )
  }
}

/* ----- CONTAINER ----- */

import { connect } from 'react-redux';

const mapStateToProps = store => ({
  html: store.displayState.currScene.paragraphsHTML[0],
  actors: store.displayState.currScene.actors,
  storyTitle: store.displayState.title,
  currScene: store.displayState.currScene
});

export default connect(mapStateToProps)(Scene);