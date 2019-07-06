import React, { Component } from 'react';

const Context = React.createContext();
const API_KEY = '68f3901d4703c898fca4bfa8037d6ea0';

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
    const API_DATA = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=srb&f_has_lyrics=1&apikey=${API_KEY}`);
    const data = await API_DATA.json();
    
    this.setState({
      track_list: data.message.body.track_list
    })
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
