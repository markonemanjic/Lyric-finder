import React, { Component } from 'react'

import { Consumer } from '../../context';
import { findTracks } from '../../services/lyrics-fetcher';

class Search extends Component {
  state = {
    trackTitle: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  findTrack = async (dispatch, e) => {
    e.preventDefault();

    const data = await findTracks(this.state.trackTitle);

    dispatch({
      type: "SEARCH_TRACKS",
      payload: data.message.body.track_list
    })

    this.setState({trackTitle: ''})
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fa fa-music"></i>Search For A Song
              </h1>
              <p className="lead text-center">Get lyrics for any song!</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter the title of a song..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange} 
                  />
                </div>
                <button className="btn-primary btn-lg btn-block mb-5" type="submit">Get Track Lyrics</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search;