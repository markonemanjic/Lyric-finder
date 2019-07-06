const API_KEY = '68f3901d4703c898fca4bfa8037d6ea0';
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1'; 

const findTracks = async (trackTitle) => {
  const API_DATA = await fetch(
    `${BASE_URL}/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`
  );

  return await API_DATA.json();
};

const getLyrics = async (id) => {
  const API_DATA = await fetch(
    `${BASE_URL}/track.lyrics.get?track_id=${id}&apikey=${API_KEY}`
  );

  const { message } = await API_DATA.json();
  return message.body.lyrics;
};

const getTrackData = async (id) => {
  const API_DATA_TRACK = await fetch(
    `${BASE_URL}/track.get?track_id=${id}&apikey=${API_KEY}`
  );
  
  const { message } = await API_DATA_TRACK.json();
  return message.body.track;
};

const getTopTen = async () => {
  const API_DATA = await fetch(
    `${BASE_URL}/chart.tracks.get?chart_name=top&page=1&page_size=10&country=srb&f_has_lyrics=1&apikey=${API_KEY}`
  );

  const { message } = await API_DATA.json();
  return message.body.track_list;
};

export {
  findTracks,
  getLyrics,
  getTrackData,
  getTopTen,
};
