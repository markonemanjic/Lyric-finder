import React, { Component } from 'react'
import { Consumer } from '../../context';

const API_KEY = '68f3901d4703c898fca4bfa8037d6ea0';

class Search extends Component {
  state = {
    trackTitle: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  findTrack = async (dispatch, e) => {
    e.preventDefault();

    const API_DATA = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`);
    const data = await API_DATA.json();

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