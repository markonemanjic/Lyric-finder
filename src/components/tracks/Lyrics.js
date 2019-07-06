import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = '68f3901d4703c898fca4bfa8037d6ea0';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  async componentDidMount() {
    const API_DATA = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${API_KEY}`);
    const data = await API_DATA.json();

    const API_DATA_TRACK = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${API_KEY}`);
    const data_track = await API_DATA_TRACK.json();

    this.setState({
      lyrics: data.message.body.lyrics,
      track: data_track.message.body.track
    })
  }

  render() {
    const { track, lyrics } = this.state;

    return (
      <React.Fragment>
        <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
        <h5 className="card-header">
          {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
        </h5>
        <div className="card-body">
          <p className="card-text">{lyrics.lyrics_body}</p>
        </div>
      </React.Fragment>
    )
  }
}

export default Lyrics;