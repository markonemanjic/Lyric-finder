import React, { Component } from 'react';
import { Consumer } from '../../context';
import Song from './Song';

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => { 
          const { track_list, header } = value;

          return (
            <React.Fragment>
              <h3 className="text-center mb-4">{header}</h3>
              <div className="row">
                {track_list.map(item => (
                  <Song key={item.track.track_id} track={item.track} />
                ))}
              </div>
            </React.Fragment>
          )
        }}
      </Consumer>
    )
  }
}

export default Tracks;
