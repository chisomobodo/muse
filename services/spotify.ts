import axios from "axios";

const baseURL = "https://accounts.spotify.com";

const spotifyApi = axios.create({
  baseURL,
});

export default spotifyApi;
