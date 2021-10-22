import axios from "axios";

export default axios.create({
  baseURL: "http://namerequest.test/api",
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  }
});