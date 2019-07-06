import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getLyrics, getTrackData } from '../../services/lyrics-fetcher';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  async componentDidMount() {
    const lyricId = this.props.match.params.id;
    const lyrics = await getLyrics(lyricId);
    const track = await getTrackData(lyricId);

    this.setState({ lyrics, track });
  }

  render() {
    const { track, lyrics } = this.state;

    return (
      <Fragment>
        <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
        <h5 className="card-header">
          {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
        </h5>
        <div className="card-body">
          <p className="card-text">{lyrics.lyrics_body}</p>
        </div>
      </Fragment>
    )
  }
}

export default Lyrics;