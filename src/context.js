import React, { Component } from 'react';

import { getTopTen } from './services/lyrics-fetcher';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        header: "Search result"
      }
      default: 
        return state;
  }
}

export class Provider extends Component {
  state = {
    track_list: [],
    header: "Top 10 tracks!",
    dispatch: action => this.setState(state => reducer(state, action))
  }

  async componentDidMount() {
    const track_list = await getTopTen();
    this.setState({ track_list });
  }

  render() {
    return (
      <div>
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      </div>
    )
  }
}

export const Consumer = Context.Consumer;
